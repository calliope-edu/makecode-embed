import { ReactNode } from 'react';
import { UseMakeCodeRenderBlocksReturn } from './useMakeCodeRenderBlocks.js';
export declare const MakeCodeRenderBlocksProvider: ({ disabled, version, lang, baseUrl, children, }: {
    /**
     * This can be used to disable loading MakeCode in scenarios where it will be unused.
     */
    disabled?: boolean | undefined;
    /**
     * MakeCode version.
     */
    version?: string | undefined;
    /**
     * MakeCode language code.
     */
    lang?: string | undefined;
    /**
     * MakeCode base URL for renderer.
     */
    baseUrl?: string | undefined;
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useMakeCodeRenderBlocksContext: () => UseMakeCodeRenderBlocksReturn;
