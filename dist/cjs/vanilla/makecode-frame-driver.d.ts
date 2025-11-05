import { EditorContentLoadedRequest, EditorEvent, EditorMessageTutorialEventRequest, EditorWorkspaceSaveRequest, EditorWorkspaceSyncRequest, ImportExternalProjectOptions, ImportFileOptions, ImportProjectOptions, InfoMessage, LanguageRestriction, MakeCodeProject, ProjectCreationOptions, ProjectFilters, RenderBlocksOptions, RenderByBlockIdOptions, RenderXmlOptions, ShareResult, StartActivityOptions, ToolboxCategoryDefinition } from './pxt.js';
export interface EditorShareOptions {
    headerId: string;
    projectName: string;
}
export interface Options {
    /**
     * A function that provides the initial set of projects to be used when initialising MakeCode.
     *
     * This will also be used if the iframe reloads itself.
     *
     * The projects will receive updates via `onWorkspaceSave` and should be stored keyed by header
     * id.
     */
    initialProjects: () => Promise<MakeCodeProject[]>;
    /**
     * Set this to a value representing your app.
     */
    controllerId?: string;
    /**
     * Filters affecting the configuration of MakeCode.
     */
    filters?: ProjectFilters;
    /**
     * Whether to show the search bar.
     */
    searchBar?: boolean;
    /**
     * Called when the main editor area is ready (e.g. after a project load).
     */
    onEditorContentLoaded?(event: EditorContentLoadedRequest): void;
    /**
     * This is not typically needed as the driver responds to MakeCode's request to sync using the initialProjects option.
     */
    onWorkspaceSync?(event: EditorWorkspaceSyncRequest): void;
    /**
     * Called when the workspace sync is complete.
     */
    onWorkspaceLoaded?(event: EditorWorkspaceSyncRequest): void;
    /**
     * Implement this to update the data store that `initialProjects` reads from.
     */
    onWorkspaceSave?(event: EditorWorkspaceSaveRequest): void;
    /**
     * This is only called via MakeCode UI, which is not visible in embedded mode.
     *
     * It's intention is to delete all projects/settings.
     */
    onWorkspaceReset?(event: EditorWorkspaceSyncRequest): void;
    /**
     * Editor events including detail on block usage and help interactions.
     */
    onWorkspaceEvent?(event: EditorEvent): void;
    /**
     * Updates as a user progresses through a tutorial.
     */
    onTutorialEvent?(event: EditorMessageTutorialEventRequest): void;
    /**
     * Requests the embedding app handles a download.
     *
     * Applies only with `controller` set to `2`.
     */
    onDownload?: (download: {
        name: string;
        hex: string;
    }) => void;
    /**
     * Requests the embedding app handles a save.
     *
     * Applies only with `controller` set to `2`.
     */
    onSave?: (save: {
        name: string;
        hex: string;
    }) => void;
    /**
     * Requests the embedding app handles a press/tap on the back arrow.
     *
     * Applies only with `controller` set to `2`.
     */
    onBack?: () => void;
    /**
     * Requests the embedding app handles a long press/tap on the back arrow.
     * This is optional.
     *
     * Applies only with `controller` set to `2`.
     */
    onBackLongPress?: () => void;
}
/**
 * A driver for MakeCode.
 *
 * This stores state to correlate requests/responses to and from MakeCode.
 */
export declare class MakeCodeFrameDriver {
    private options;
    private iframe;
    private ready;
    private messageQueue;
    private nextId;
    private pendingResponses;
    private _expectedOrigin;
    private expectedOrigin;
    private listener;
    constructor(options: Options, iframe: () => HTMLIFrameElement | undefined);
    initialize(): void;
    setOptions(options: Options): void;
    dispose(): void;
    private sendRequest;
    private sendMessage;
    private sendMessageNoReadyCheck;
    private handleWorkspaceSync;
    /**
     * Switch the MakeCode to blocks mode.
     *
     * You can find the current mode in the project.
     */
    switchBlocks(): Promise<void>;
    /**
     * Switch the MakeCode to JavaScript mode.
     *
     * You can find the current mode in the project.
     */
    switchJavascript(): Promise<void>;
    /**
     * Switch the MakeCode to JavaScript mode.
     *
     * You can find the current mode in the project.
     */
    switchPython(): Promise<void>;
    /**
     * Start the simulator.
     */
    startSimulator(): Promise<void>;
    /**
     * Restarts the simulator.
     */
    restartSimulator(): Promise<void>;
    /**
     * Stops the simulator.
     */
    stopSimulator(options?: {
        /**
         * Optionally unload the simulator (removes its UI)
         */
        unload: boolean;
    }): Promise<void>;
    /**
     * Hides the simulator. The user can reverse this via the UI.
     */
    hideSimulator(): Promise<void>;
    /**
     * Show the simulator. The user can reverse this via the UI.
     */
    showSimulator(): Promise<void>;
    /**
     * Closes the toolbox and similar UX.
     */
    closeFlyout(): Promise<void>;
    /**
     * Create a new project.
     */
    newProject(options?: ProjectCreationOptions): Promise<void>;
    /**
     * Import a project.
     *
     * The project needs to have a header.
     * Otherwise consider `newProject`
     */
    importProject(options: ImportProjectOptions): Promise<void>;
    /**
     * Create a URL that can be used to import a project into MakeCode.
     *
     * This can be useful if MakeCode is embedded in one application but you want to be able to export to non-embedded MakeCode.
     *
     * The applications must be part of the same site as the process relies on shared client-side storage.
     *
     * The URL must be used immediately as it won't remain valid if another call is made.
     */
    importExternalProject(options: ImportExternalProjectOptions): Promise<{
        importUrl: string;
    }>;
    /**
     * Import a tutorial from markdown text.
     *
     * See also `startActivity`.
     */
    importTutorial(options: {
        markdown: string;
    }): Promise<void>;
    /**
     * Open a MakeCode project.
     */
    openHeader(headerId: string): Promise<void>;
    /**
     * Undo.
     */
    undo(): Promise<void>;
    /**
     * Redo.
     */
    redo(): Promise<void>;
    renderBlocks(options: RenderBlocksOptions): Promise<string>;
    renderPython(options: {
        ts: string;
    }): Promise<string | undefined>;
    renderXml(options: RenderXmlOptions): Promise<string | undefined>;
    /**
     * Renders an individual block by type (e.g. basic_show_id) to an SVG data URI.
     */
    renderByBlockId(options: RenderByBlockIdOptions): Promise<string | undefined>;
    setScale({ scale }: {
        scale: number;
    }): Promise<void>;
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
    startActivity(options: StartActivityOptions): Promise<void>;
    saveProject(): Promise<void>;
    compile(): Promise<void>;
    unloadProject(): Promise<void>;
    shareProject(options: EditorShareOptions): Promise<ShareResult>;
    /**
     * Change the language restriction (e.g. move to just JavaScript).
     */
    setLanguageRestriction(restriction: LanguageRestriction): Promise<void>;
    getToolboxCategories(options?: {
        advanced?: boolean;
    }): Promise<ToolboxCategoryDefinition[]>;
    toggleDebugSloMo(options?: {
        invervalSpeed?: number;
    }): Promise<void>;
    setDebugSlowMo(options: {
        enabled: boolean;
        intervalSpeed?: number;
    }): Promise<void>;
    showThemePicker(): Promise<void>;
    toggleHighContrast(): Promise<void>;
    setHighContrast(on: boolean): Promise<void>;
    toggleKeyboardControls(): Promise<void>;
    toggleGreenScreen(): Promise<void>;
    setSimulatorFullScreen(enabled: boolean): Promise<void>;
    print(): Promise<void>;
    pair(): Promise<void>;
    info(): Promise<InfoMessage>;
    /**
     * Import a file.
     *
     * This works with hex and mkcd files.
     *
     * TODO: Other types may also be supported.
     */
    importFile(options: ImportFileOptions): void;
}
export declare const createMakeCodeURL: (baseUrl: string | undefined, version: string | undefined, lang: string | undefined, controller: number | undefined, queryParams: Record<string, string> | undefined) => string;
