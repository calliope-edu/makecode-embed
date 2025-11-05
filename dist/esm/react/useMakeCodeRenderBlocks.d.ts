import { MakeCodeRenderBlocksOptions, RenderBlocksRequest, RenderBlocksResponse } from '../vanilla/makecode-render-blocks.js';
export interface UseMakeCodeRenderBlocksReturn {
    renderBlocks: (req: RenderBlocksRequest) => Promise<RenderBlocksResponse>;
}
declare const useMakeCodeRenderBlocks: (options: MakeCodeRenderBlocksOptions) => UseMakeCodeRenderBlocksReturn;
export default useMakeCodeRenderBlocks;
