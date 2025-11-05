"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMakeCodeRenderBlocksContext = exports.MakeCodeRenderBlocksProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useMakeCodeRenderBlocks_js_1 = __importDefault(require("./useMakeCodeRenderBlocks.js"));
const MakeCodeRenderBlocksContext = (0, react_1.createContext)({
    renderBlocks: () => {
        throw new Error('Configure MakeCodeRenderBlocksProvider.');
    },
});
const MakeCodeRenderBlocksProvider = ({ disabled, version, lang, baseUrl, children, }) => {
    const options = (0, react_1.useMemo)(() => {
        return { disabled, version, lang, baseUrl };
    }, [disabled, lang, version, baseUrl]);
    const value = (0, useMakeCodeRenderBlocks_js_1.default)(options);
    return ((0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksContext.Provider, { value: value, children: children }));
};
exports.MakeCodeRenderBlocksProvider = MakeCodeRenderBlocksProvider;
const useMakeCodeRenderBlocksContext = () => (0, react_1.useContext)(MakeCodeRenderBlocksContext);
exports.useMakeCodeRenderBlocksContext = useMakeCodeRenderBlocksContext;
//# sourceMappingURL=MakeCodeRenderBlocksProvider.js.map