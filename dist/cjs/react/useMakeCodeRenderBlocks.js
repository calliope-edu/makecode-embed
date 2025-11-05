"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const makecode_render_blocks_js_1 = require("../vanilla/makecode-render-blocks.js");
const useMakeCodeRenderBlocks = (options) => {
    const { disabled, lang, version, baseUrl } = options;
    const memoizedOptions = (0, react_1.useMemo)(() => {
        return { disabled, lang, version, baseUrl };
    }, [disabled, lang, version, baseUrl]);
    const returnValue = (0, react_1.useMemo)(() => (0, makecode_render_blocks_js_1.createMakeCodeRenderBlocks)(memoizedOptions), [memoizedOptions]);
    (0, react_1.useEffect)(() => {
        returnValue.initialize();
        return () => returnValue.dispose();
    }, [returnValue]);
    return returnValue;
};
exports.default = useMakeCodeRenderBlocks;
//# sourceMappingURL=useMakeCodeRenderBlocks.js.map