/**
 * MakeCode handling that does not depend on React.
 */
const disposedMessage = 'Disposed';
const makecodeFailedToLoadMessage = 'Failed to load MakeCode to render blocks.';
export const createMakeCodeRenderBlocks = (options) => {
    const defaultedOptions = {
        ...options,
    };
    const makecodeOrigin = options.baseUrl ?? 'https://makecode.calliope.cc';
    let iframe;
    let status = 'loading';
    const requestStatus = {
        nextRequest: 0,
        pendingRequests: {},
    };
    const pendingRequests = requestStatus.pendingRequests;
    const failAllPending = (errorMessage) => {
        Object.keys(requestStatus.pendingRequests).forEach((k) => {
            const { promise } = pendingRequests[k];
            delete pendingRequests[k];
            promise.reject(errorMessage);
        });
    };
    const sendPendingIfReady = () => {
        if (status === 'ready') {
            // Possible that dispose has been called by the time we process the message,
            // in which case do nothing.
            if (iframe) {
                Object.values(pendingRequests).forEach((rr) => ensureMessageSent(rr));
            }
        }
        else if (status === 'error') {
            failAllPending(makecodeFailedToLoadMessage);
        }
        else if (status === 'disabled') {
            failAllPending('renderBlocks will always fail when explicitly disabled');
        }
        else {
            // We're loading, we'll send these when done.
        }
    };
    const ensureMessageSent = (rr) => {
        if (!rr.sent) {
            rr.sent = true;
            const { req } = rr;
            iframe.contentWindow.postMessage(req, makecodeOrigin);
        }
    };
    const findBestCode = (code, ignoreBlocks) => {
        if (typeof code === 'string') {
            return { code, type: 'text' };
        }
        if (code.text) {
            const blocks = code.text['main.blocks'];
            const text = code.text['main.ts'];
            if (blocks && !ignoreBlocks) {
                return {
                    code: blocks,
                    type: 'blocks',
                };
            }
            if (text) {
                return {
                    code: text,
                    type: 'text',
                };
            }
        }
        return { code: '', type: 'text' };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorTimeout;
    const handleMessage = (ev) => {
        const msg = ev.data;
        if (ev.source !== iframe?.contentWindow || msg.source !== 'makecode') {
            return;
        }
        switch (msg.type) {
            case 'renderready': {
                window.clearTimeout(errorTimeout);
                status = 'ready';
                sendPendingIfReady();
                break;
            }
            case 'renderblocks': {
                const id = msg.id;
                const matchingRequest = pendingRequests[id];
                if (!matchingRequest) {
                    return;
                }
                const result = msg;
                // This currently happens for extension blocks.
                // We retry with text based rendering.
                // MakeCode beta appears to do this internally.
                if (!result.error &&
                    !result.width &&
                    !result.height &&
                    !result.svg &&
                    !result.uri) {
                    if (matchingRequest.type === 'blocks') {
                        matchingRequest.sent = false;
                        matchingRequest.type = 'text';
                        matchingRequest.req.code = findBestCode(matchingRequest.input, true).code;
                        ensureMessageSent(matchingRequest);
                        return;
                    }
                    else {
                        result.error = 'Internal MakeCode failure.';
                    }
                }
                delete pendingRequests[id];
                if (result.error) {
                    matchingRequest.promise.reject(result.error);
                }
                else {
                    matchingRequest.promise.resolve(msg);
                }
                break;
            }
        }
    };
    return {
        initialize: () => {
            if (options.disabled) {
                return;
            }
            window.addEventListener('message', handleMessage);
            iframe = createIframe(makecodeOrigin, defaultedOptions);
            errorTimeout = setTimeout(() => {
                failAllPending(makecodeFailedToLoadMessage);
                status = 'error';
            }, 30000);
        },
        dispose: () => {
            window.clearTimeout(errorTimeout);
            window.removeEventListener('message', handleMessage);
            if (iframe && iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
            }
            iframe = undefined;
            failAllPending(disposedMessage);
        },
        renderBlocks: (req) => {
            const id = requestStatus.nextRequest++ + '';
            const { code, type } = findBestCode(req.code);
            const makecodeRequest = {
                id,
                code,
                type: 'renderblocks',
                options: {
                    ...req.options,
                    // To include files to filesystem
                    assets: typeof req.code === 'object' ? req.code.text : undefined,
                    package: defaultPackageFromDependencies(req),
                },
            };
            return new Promise((resolve, reject) => {
                pendingRequests[id] = {
                    type,
                    input: req.code,
                    sent: false,
                    req: makecodeRequest,
                    promise: { resolve, reject },
                };
                sendPendingIfReady();
            });
        },
    };
};
function defaultPackageFromDependencies(req) {
    // Package can encode the extensions used in a comma separated list in this format:
    // automationbit=github:pimoroni/pxt-automationbit#v0.0.2
    // We can find that list from the JSON passed (but not from blocks or text)
    const _package = req.options && req.options.package ? req.options.package : undefined;
    if (typeof _package === 'undefined' &&
        typeof req.code === 'object' &&
        req.code.text['pxt.json']) {
        const parsed = JSON.parse(req.code.text['pxt.json']);
        if (typeof parsed === 'object') {
            // Cope with extensions with spaces in their names. Otherwise pxt rejects
            // adding the dependency even if it would in normal usage.
            // https://github.com/microbit-foundation/classroom-management-tool/issues/463
            const sanitizedName = (s) => s.replace(/[^a-zA-Z0-9_-]/g, '_');
            const dependencies = parsed.dependencies || {};
            const result = Object.keys(dependencies)
                .map((name) => `${sanitizedName(name)}=${dependencies[name]}`)
                .join(',');
            return result;
        }
    }
    return _package;
}
function createIframe(makecodeOrigin, { lang, version, baseUrl }) {
    const query = `?render=1${lang ? `&lang=${encodeURIComponent(lang)}` : ''}`;
    const src = baseUrl
        ? makecodeOrigin + query
        : [makecodeOrigin, version, '--docs'].filter(Boolean).join('/') + query;
    const f = document.createElement('iframe');
    f.style.position = 'absolute';
    f.style.width = '1px';
    f.style.height = '1px';
    f.style.border = '0';
    f.style.clip = 'rect(0 0 0 0)';
    f.style.margin = '-1px';
    f.style.padding = '0';
    f.style.overflow = 'hidden';
    f.style.whiteSpace = 'nowrap';
    f.setAttribute('loading', 'eager');
    f.setAttribute('aria-hidden', 'true');
    f.src = src;
    document.body.appendChild(f);
    return f;
}
//# sourceMappingURL=makecode-render-blocks.js.map