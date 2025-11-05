import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo } from 'react';
import useMakeCodeRenderBlocks from './useMakeCodeRenderBlocks.js';
const MakeCodeRenderBlocksContext = createContext({
    renderBlocks: () => {
        throw new Error('Configure MakeCodeRenderBlocksProvider.');
    },
});
export const MakeCodeRenderBlocksProvider = ({ disabled, version, lang, baseUrl, children, }) => {
    const options = useMemo(() => {
        return { disabled, version, lang, baseUrl };
    }, [disabled, lang, version, baseUrl]);
    const value = useMakeCodeRenderBlocks(options);
    return (_jsx(MakeCodeRenderBlocksContext.Provider, { value: value, children: children }));
};
export const useMakeCodeRenderBlocksContext = () => useContext(MakeCodeRenderBlocksContext);
//# sourceMappingURL=MakeCodeRenderBlocksProvider.js.map