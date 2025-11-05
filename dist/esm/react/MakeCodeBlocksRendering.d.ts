/**
 * A React component
 * to render MakeCode block snippets
 */
import React from 'react';
import { BlockLayout, MakeCodeProject } from '../vanilla/pxt.js';
export interface MakeCodeBlocksRenderingProps {
    className?: string;
    code?: string | MakeCodeProject;
    packageId?: string;
    package?: string;
    snippetMode?: boolean;
    layout?: BlockLayout;
    loaderCmp?: React.ReactNode;
}
export interface MakeCodeBlocksRenderingState {
    uri?: string;
    width?: number;
    height?: number;
    error?: string;
    rendering: boolean;
}
declare const _default: React.MemoExoticComponent<({ loaderCmp, package: _package, packageId, snippetMode, layout, code, className, }: MakeCodeBlocksRenderingProps) => import("react/jsx-runtime").JSX.Element>;
export default _default;
