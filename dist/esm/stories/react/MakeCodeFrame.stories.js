import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useRef } from 'react';
import { defaultMakeCodeProject } from '../../vanilla/examples.js';
import { default as MakeCodeFrame, } from '../../react/MakeCodeFrame.js';
import { controllerId } from '../config.js';
import StoryWrapper from '../StoryWrapper.js';
import MakeCodeToolbar from '../MakeCodeToolbar.js';
const meta = {
    title: 'stories/React/MakeCodeFrame',
    component: MakeCodeFrame,
    argTypes: {
        version: {
            options: ['default', 'beta'],
            defaultValue: undefined,
            name: 'version',
            control: { type: 'radio' },
        },
    },
};
export default meta;
const MakeCodeEditorWithControls = (props) => {
    const savedProjects = useRef(new Map());
    const ref = useRef(null);
    const initialProjects = useCallback(async () => {
        if (savedProjects.current.size === 0) {
            // Maybe we can switch to using newProject instead?
            return [defaultMakeCodeProject];
        }
        return [...savedProjects.current.values()];
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(MakeCodeToolbar, { savedProjects: savedProjects, driver: ref }), _jsx(MakeCodeFrame, { ref: ref, controller: 1, controllerId: controllerId, initialProjects: initialProjects, onEditorContentLoaded: (e) => console.log('editorContentLoaded', e), onWorkspaceLoaded: (e) => console.log('workspaceLoaded', e), onWorkspaceSync: (e) => console.log('workspaceSync', e), onWorkspaceReset: (e) => console.log('workspaceReset', e), onWorkspaceEvent: (e) => console.log('workspaceEvent', e), onWorkspaceSave: (e) => {
                    savedProjects.current?.set(e.project.header.id, e.project);
                    console.log(savedProjects.current);
                }, onTutorialEvent: (e) => console.log('tutorialEvent', e), ...props })] }));
};
export const MakeCodeEditorWithControlsStory = {
    name: 'MakeCode Editor with controls',
    args: {
        version: 'default',
    },
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeEditorWithControls, { version: version === 'default' ? undefined : version, 
                // TODO: make this an argument and perhaps a real prop
                queryParams: { hideMenu: '' } }) }));
    },
};
export const MakeCodeEditorControllerAppModeStory = {
    name: 'MakeCode Editor with controller=2 mode',
    args: {
        version: 'default',
    },
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeEditorWithControls, { controller: 2, controllerId: controllerId, version: version === 'default' ? undefined : version, 
                // App specific events
                onDownload: (download) => console.log('download', download), onSave: (save) => console.log('save', save), onBack: () => console.log('back'), onBackLongPress: () => console.log('back long') }) }));
    },
};
//# sourceMappingURL=MakeCodeFrame.stories.js.map