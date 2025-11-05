/**
 * MakeCode handling that does not depend on React.
 */
import { BlockLayout, MakeCodeProject } from './pxt.js';
export interface MakeCodeRenderBlocksOptions {
    disabled?: boolean;
    version?: string;
    lang?: string;
    baseUrl?: string;
}
export interface MakeCodeRenderBlocksReturn {
    renderBlocks: (req: RenderBlocksRequest) => Promise<RenderBlocksResponse>;
    initialize: () => void;
    dispose: () => void;
}
export interface RenderBlocksRequest {
    code: string | MakeCodeProject;
    options?: {
        packageId?: string;
        package?: string;
        snippetMode?: boolean;
        layout?: BlockLayout;
    };
}
export interface RenderBlocksResponse {
    uri?: string;
    css?: string;
    svg?: string;
    width?: number;
    height?: number;
}
export declare const createMakeCodeRenderBlocks: (options: MakeCodeRenderBlocksOptions) => MakeCodeRenderBlocksReturn;
