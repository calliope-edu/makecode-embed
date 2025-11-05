/**
 * A driver for MakeCode.
 *
 * This stores state to correlate requests/responses to and from MakeCode.
 */
export class MakeCodeFrameDriver {
    constructor(options, iframe) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "iframe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: iframe
        });
        Object.defineProperty(this, "ready", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "messageQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "nextId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "pendingResponses", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "_expectedOrigin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "expectedOrigin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this._expectedOrigin) {
                    return this._expectedOrigin;
                }
                const src = this.iframe()?.src;
                if (src) {
                    this._expectedOrigin = new URL(src).origin;
                    return this._expectedOrigin;
                }
                return undefined;
            }
        });
        Object.defineProperty(this, "listener", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                const expectedOrigin = this.expectedOrigin();
                if (!expectedOrigin || event.origin !== expectedOrigin) {
                    return;
                }
                const { data } = event;
                if (typeof data !== 'object') {
                    return;
                }
                // I think 'editorcontentloaded' isn't useful here in controller scenarios but needs confirming.
                // Might be the right option when waiting to render blocks or similar?
                if (data.type === 'iframeclientready' ||
                    (data.type === 'pxthost' && data.action === 'editorcontentloaded')) {
                    this.ready = true;
                    this.messageQueue.forEach((m) => this.sendMessageNoReadyCheck(m));
                    this.messageQueue.length = 0;
                }
                if (data.type === 'pxteditor') {
                    // A reply to a message we sent.  Some of these have useful data in a
                    // semi-standard resp field but others have useful top-level fields so we
                    // leave it to the caller to handle each message type.
                    const pendingResponse = this.pendingResponses.get(data.id);
                    if (pendingResponse) {
                        this.pendingResponses.delete(data.id);
                        const { resolve, reject } = pendingResponse;
                        if (data.success) {
                            resolve(data);
                        }
                        else {
                            reject(data.error ??
                                new Error('MakeCode response was not successful with no error specified'));
                        }
                    }
                }
                else if (data.type === 'pxthost') {
                    this.handleWorkspaceSync(data);
                    switch (data.action) {
                        case 'event': {
                            // Can't make these happen.
                            // Might require "allowSimTelemetry". But even then I can only see them fired with type: "pxtsim".
                            return;
                        }
                        case 'simevent': {
                            // So far as I can tell these don't fire.
                            // The logic in MakeCode doesn't seem to allow them in controller mode, only if allowParentController is set.
                            // In other scenarios either being true is sufficient.
                            return;
                        }
                        case 'tutorialevent': {
                            return this.options.onTutorialEvent?.(data);
                        }
                        case 'workspacesave': {
                            return this.options.onWorkspaceSave?.(data);
                        }
                        case 'workspaceevent': {
                            return this.options.onWorkspaceEvent?.(data.event);
                        }
                        case 'workspacereset': {
                            return this.options.onWorkspaceReset?.(data);
                        }
                        case 'workspacesync': {
                            return this.options.onWorkspaceSync?.(data);
                        }
                        case 'workspaceloaded': {
                            return this.options.onWorkspaceLoaded?.(data);
                        }
                        case 'workspacediagnostics': {
                            // So far as I can tell these don't fire.
                            // The logic in MakeCode doesn't seem to allow them in controller mode, only if allowParentController is set.
                            // In other scenarios either being true is sufficient.
                            return;
                        }
                        case 'editorcontentloaded': {
                            return this.options.onEditorContentLoaded?.(data);
                        }
                        case 'projectcloudstatus': {
                            // Requesting cloud status likely only works on the same domain as MakeCode
                            // so isn't implemented.
                            return;
                        }
                    }
                }
                else if ('download' in data) {
                    // Native app oriented event that doesn't have a 'type' field.
                    this.options.onDownload?.({
                        name: data.name,
                        hex: data.download,
                    });
                }
                else if ('save' in data) {
                    // Native app oriented event that doesn't have a 'type' field.
                    this.options.onSave?.({
                        name: data.name,
                        hex: data.save,
                    });
                }
                else if ('cmd' in data) {
                    // Native app oriented event that doesn't have a 'type' field.
                    switch (data.cmd) {
                        case 'backtap':
                            // MakeCode seems to send this twice for a single click but there's little we can do here.
                            return this.options.onBack?.();
                        case 'backpress':
                            return this.options.onBackLongPress?.();
                    }
                }
            }
        });
        Object.defineProperty(this, "sendRequest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (message) => {
                message.response = true;
                if (!message.id) {
                    message.id = (this.nextId++).toString();
                }
                const id = message.id;
                const p = new Promise((resolve, reject) => {
                    this.pendingResponses.set(id, { resolve, reject, message });
                });
                this.sendMessage(message);
                return p;
            }
        });
        Object.defineProperty(this, "sendMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (message) => {
                if (this.ready) {
                    this.sendMessageNoReadyCheck(message);
                }
                else {
                    this.messageQueue.push(message);
                }
            }
        });
        Object.defineProperty(this, "sendMessageNoReadyCheck", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (message) => {
                this.iframe()?.contentWindow?.postMessage(message, '*');
            }
        });
    }
    initialize() {
        window.addEventListener('message', this.listener);
        // If the iframe is already loaded this will ensure we still initialize correctly
        this.iframe()?.contentWindow?.postMessage({
            type: 'iframeclientready',
        }, '*');
    }
    setOptions(options) {
        this.options = options;
    }
    dispose() {
        window.removeEventListener('message', this.listener);
    }
    async handleWorkspaceSync(event) {
        let error = undefined;
        try {
            if (event.action === 'workspacesync') {
                const projects = await this.options.initialProjects();
                const { filters, searchBar, controllerId } = this.options;
                // I think the MakeCode driver waits for ready here but that doesn't work with live MakeCode.
                this.sendMessageNoReadyCheck({
                    ...event,
                    success: true,
                    projects,
                    controllerId,
                    editor: {
                        filters,
                        searchBar,
                    },
                });
            }
            else if (event.action === 'workspacesave') {
                this.options.onWorkspaceSave?.(event);
            }
        }
        catch (e) {
            error = e;
            console.error(e);
        }
        finally {
            if (event.response) {
                this.sendMessageNoReadyCheck({
                    type: 'pxthost',
                    id: event.id,
                    success: !error,
                    error,
                });
            }
        }
    }
    /**
     * Switch the MakeCode to blocks mode.
     *
     * You can find the current mode in the project.
     */
    async switchBlocks() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'switchblocks',
        });
    }
    /**
     * Switch the MakeCode to JavaScript mode.
     *
     * You can find the current mode in the project.
     */
    async switchJavascript() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'switchjavascript',
        });
    }
    /**
     * Switch the MakeCode to JavaScript mode.
     *
     * You can find the current mode in the project.
     */
    async switchPython() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'switchpython',
        });
    }
    /**
     * Start the simulator.
     */
    async startSimulator() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'startsimulator',
        });
    }
    /**
     * Restarts the simulator.
     */
    async restartSimulator() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'restartsimulator',
        });
    }
    /**
     * Stops the simulator.
     */
    async stopSimulator(options) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'stopsimulator',
            ...options,
        });
    }
    /**
     * Hides the simulator. The user can reverse this via the UI.
     */
    async hideSimulator() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'hidesimulator',
        });
    }
    /**
     * Show the simulator. The user can reverse this via the UI.
     */
    async showSimulator() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'showsimulator',
        });
    }
    /**
     * Closes the toolbox and similar UX.
     */
    async closeFlyout() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'closeflyout',
        });
    }
    /**
     * Create a new project.
     */
    async newProject(options) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'newproject',
            options,
        });
    }
    /**
     * Import a project.
     *
     * The project needs to have a header.
     * Otherwise consider `newProject`
     */
    async importProject(options) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'importproject',
            ...options,
        });
    }
    /**
     * Create a URL that can be used to import a project into MakeCode.
     *
     * This can be useful if MakeCode is embedded in one application but you want to be able to export to non-embedded MakeCode.
     *
     * The applications must be part of the same site as the process relies on shared client-side storage.
     *
     * The URL must be used immediately as it won't remain valid if another call is made.
     */
    async importExternalProject(options) {
        const response = (await this.sendRequest({
            type: 'pxteditor',
            action: 'importexternalproject',
            ...options,
        }));
        return response.resp;
    }
    /**
     * Import a tutorial from markdown text.
     *
     * See also `startActivity`.
     */
    async importTutorial(options) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'importtutorial',
            ...options,
        });
    }
    /**
     * Open a MakeCode project.
     */
    async openHeader(headerId) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'openheader',
            headerId,
        });
    }
    /**
     * Undo.
     */
    async undo() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'undo',
        });
    }
    /**
     * Redo.
     */
    async redo() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'redo',
        });
    }
    // It's confusingly different from https://makecode.microbit.org/blocks-embed#:~:text=Render%20Blocks%20Response%20message,as%20an%20image%20data%20source
    // Would be good to see if it takes all those options in practice.
    async renderBlocks(options) {
        const result = (await this.sendRequest({
            type: 'pxteditor',
            action: 'renderblocks',
            ...options,
        }));
        return result.resp;
    }
    async renderPython(options) {
        const { resp } = (await this.sendRequest({
            type: 'pxteditor',
            action: 'renderpython',
            ...options,
        }));
        return resp;
    }
    async renderXml(options) {
        const { resp } = (await this.sendRequest({
            type: 'pxteditor',
            action: 'renderxml',
            ...options,
        }));
        return resp;
    }
    /**
     * Renders an individual block by type (e.g. basic_show_id) to an SVG data URI.
     */
    async renderByBlockId(options) {
        const { resp } = (await this.sendRequest({
            type: 'pxteditor',
            action: 'renderbyblockid',
            ...options,
        }));
        return resp;
    }
    async setScale({ scale }) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'setscale',
            scale,
        });
    }
    /**
     * See https://github.com/microsoft/pxt-microbit/issues/5456
     *
     * Tutorial tool sharing link ID from https:*makecode.com/tutorial-tool prefixed with 'S'
     * path: 'S96773-99918-18806-19059',
     *
     * Built-in tutorial
     * path: '/projects/rock-paper-scissors',
     *
     * GitHub repo (no trailing .md, no blob/main cruft, tag versions)
     *
     * You get a series of "tutorialevent" actions tracking load and progress
     * which we'd need to add support for at least to error handle the load.
     */
    async startActivity(options) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'startactivity',
            ...options,
        });
    }
    async saveProject() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'saveproject',
        });
    }
    async compile() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'compile',
        });
    }
    async unloadProject() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'unloadproject',
        });
    }
    async shareProject(options) {
        const { resp } = (await this.sendRequest({
            type: 'pxteditor',
            action: 'shareproject',
            ...options,
        }));
        return resp;
    }
    /**
     * Change the language restriction (e.g. move to just JavaScript).
     */
    async setLanguageRestriction(restriction) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'setlanguagerestriction',
            restriction,
        });
    }
    async getToolboxCategories(options) {
        // Oddly the type seems to be for the resp field rather than the message
        const { resp: { categories }, } = (await this.sendRequest({
            type: 'pxteditor',
            action: 'gettoolboxcategories',
            ...options,
        }));
        return categories;
    }
    async toggleDebugSloMo(options) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'toggletrace',
            ...options,
        });
    }
    async setDebugSlowMo(options) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'settracestate',
            ...options,
        });
    }
    async showThemePicker() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'showthemepicker',
        });
    }
    async toggleHighContrast() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'togglehighcontrast',
        });
    }
    async setHighContrast(on) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'sethighcontrast',
            on,
        });
    }
    async toggleKeyboardControls() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'togglekeyboardcontrols',
        });
    }
    async toggleGreenScreen() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'togglegreenscreen',
        });
    }
    async setSimulatorFullScreen(enabled) {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'setsimulatorfullscreen',
            enabled,
        });
    }
    async print() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'print',
        });
    }
    async pair() {
        await this.sendRequest({
            type: 'pxteditor',
            action: 'pair',
        });
    }
    async info() {
        const { resp } = (await this.sendRequest({
            type: 'pxteditor',
            action: 'info',
        }));
        return resp;
    }
    /**
     * Import a file.
     *
     * This works with hex and mkcd files.
     *
     * TODO: Other types may also be supported.
     */
    importFile(options) {
        this.sendMessage({
            type: 'importfile',
            ...options,
        });
    }
}
export const createMakeCodeURL = (baseUrl, version, lang, controller, queryParams) => {
    const url = new URL(baseUrl + (version ? `/${encodeURIComponent(version)}` : ''));
    if (lang) {
        url.searchParams.set('lang', lang);
    }
    if (controller) {
        url.searchParams.set('controller', controller.toString());
    }
    if (queryParams) {
        for (const [k, v] of Object.entries(queryParams)) {
            url.searchParams.set(k, v);
        }
    }
    return url.toString();
};
//# sourceMappingURL=makecode-frame-driver.js.map