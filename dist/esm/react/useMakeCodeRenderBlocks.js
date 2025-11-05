import { useEffect, useMemo } from 'react';
import { createMakeCodeRenderBlocks, } from '../vanilla/makecode-render-blocks.js';
const useMakeCodeRenderBlocks = (options) => {
    const { disabled, lang, version, baseUrl } = options;
    const memoizedOptions = useMemo(() => {
        return { disabled, lang, version, baseUrl };
    }, [disabled, lang, version, baseUrl]);
    const returnValue = useMemo(() => createMakeCodeRenderBlocks(memoizedOptions), [memoizedOptions]);
    useEffect(() => {
        returnValue.initialize();
        return () => returnValue.dispose();
    }, [returnValue]);
    return returnValue;
};
export default useMakeCodeRenderBlocks;
//# sourceMappingURL=useMakeCodeRenderBlocks.js.map