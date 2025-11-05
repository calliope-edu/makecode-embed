"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * A React component
 * to render MakeCode block snippets
 */
const react_1 = __importStar(require("react"));
const MakeCodeRenderBlocksProvider_js_1 = require("./MakeCodeRenderBlocksProvider.js");
const MakeCodeBlocksRendering = ({ loaderCmp, package: _package, packageId, snippetMode, layout, code, className, }) => {
    const [state, setState] = (0, react_1.useState)({
        rendering: true,
    });
    const { renderBlocks } = (0, MakeCodeRenderBlocksProvider_js_1.useMakeCodeRenderBlocksContext)();
    (0, react_1.useEffect)(() => {
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
        component = loaderCmp ? loaderCmp : (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    }
    else if (error) {
        component = (0, jsx_runtime_1.jsx)("div", { children: error });
    }
    else if (uri) {
        component = ((0, jsx_runtime_1.jsx)("img", { className: "ui image", alt: code === undefined || typeof code === 'string'
                ? code
                : code.text['main.ts'], src: uri, width: width, height: height }));
    }
    else {
        throw new Error('Unexpected state.');
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: className, style: { overflow: 'auto' }, children: component }));
};
exports.default = react_1.default.memo(MakeCodeBlocksRendering);
//# sourceMappingURL=MakeCodeBlocksRendering.js.map