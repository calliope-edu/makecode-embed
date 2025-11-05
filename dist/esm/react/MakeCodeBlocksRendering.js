import { jsx as _jsx } from "react/jsx-runtime";
/**
 * A React component
 * to render MakeCode block snippets
 */
import React, { useState, useEffect } from 'react';
import { useMakeCodeRenderBlocksContext } from './MakeCodeRenderBlocksProvider.js';
const MakeCodeBlocksRendering = ({ loaderCmp, package: _package, packageId, snippetMode, layout, code, className, }) => {
    const [state, setState] = useState({
        rendering: true,
    });
    const { renderBlocks } = useMakeCodeRenderBlocksContext();
    useEffect(() => {
        let ignoreReponse = false;
        async function intializeRendering() {
            try {
                const r = await renderBlocks({
                    code: code || '',
                    options: {
                        packageId,
                        package: _package,
                        snippetMode,
                        layout,
                    },
                });
                if (!ignoreReponse) {
                    setState({
                        uri: r.uri,
                        width: r.width,
                        height: r.height,
                        rendering: false,
                    });
                }
            }
            catch (e) {
                if (!ignoreReponse) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setState({ error: e.toString(), rendering: false });
                }
            }
        }
        if (typeof code === 'string' && !code.trim()) {
            // If you render an empty string MakeCode responds with a smiley face, so we
            // need to check first.
            setState({
                rendering: false,
                height: 0,
                width: 0,
            });
        }
        else {
            intializeRendering();
        }
        return () => {
            ignoreReponse = true;
        };
    }, [code, packageId, _package, snippetMode, layout, renderBlocks]);
    const { uri, width, height, error, rendering } = state;
    let component;
    if (width === 0 && height === 0) {
        component = null;
    }
    else if (rendering) {
        component = loaderCmp ? loaderCmp : _jsx("div", { children: "Loading..." });
    }
    else if (error) {
        component = _jsx("div", { children: error });
    }
    else if (uri) {
        component = (_jsx("img", { className: "ui image", alt: code === undefined || typeof code === 'string'
                ? code
                : code.text['main.ts'], src: uri, width: width, height: height }));
    }
    else {
        throw new Error('Unexpected state.');
    }
    return (_jsx("div", { className: className, style: { overflow: 'auto' }, children: component }));
};
export default React.memo(MakeCodeBlocksRendering);
//# sourceMappingURL=MakeCodeBlocksRendering.js.map