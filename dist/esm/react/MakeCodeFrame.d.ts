import React from 'react';
import { MakeCodeFrameDriver } from '../vanilla/makecode-frame-driver.js';
import { EditorContentLoadedRequest, EditorEvent, EditorMessageTutorialEventRequest, EditorWorkspaceSaveRequest, EditorWorkspaceSyncRequest, MakeCodeProject, ProjectFilters } from '../vanilla/pxt.js';
export interface MakeCodeFrameProps extends React.ComponentPropsWithoutRef<'iframe'> {
    baseUrl?: string;
    version?: string;
    lang?: string;
    controller?: 1 | 2;
    queryParams?: Record<string, string>;
    initialProjects: () => Promise<MakeCodeProject[]>;
    controllerId?: string;
    filters?: ProjectFilters;
    searchBar?: boolean;
    onDownload?: (download: {
        name: string;
        hex: string;
    }) => void;
    onSave?: (save: {
        name: string;
        hex: string;
    }) => void;
    onBack?: () => void;
    onBackLongPress?: () => void;
    onEditorContentLoaded?(event: EditorContentLoadedRequest): void;
    onWorkspaceLoaded?(event: EditorWorkspaceSyncRequest): void;
    onWorkspaceSync?(event: EditorWorkspaceSyncRequest): void;
    /**
     * This is only called via MakeCode UI that's not visible in embedded mode.
     *
     * It's intention is to delete all projects/settings.
     */
    onWorkspaceReset?(event: EditorWorkspaceSyncRequest): void;
    onWorkspaceEvent?(event: EditorEvent): void;
    onWorkspaceSave?(event: EditorWorkspaceSaveRequest): void;
    onTutorialEvent?(event: EditorMessageTutorialEventRequest): void;
}
declare const MakeCodeFrame: React.ForwardRefExoticComponent<MakeCodeFrameProps & React.RefAttributes<MakeCodeFrameDriver>>;
export default MakeCodeFrame;
