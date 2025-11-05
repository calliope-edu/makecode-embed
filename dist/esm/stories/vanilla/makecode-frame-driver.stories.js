import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { defaultMakeCodeProject } from '../../vanilla/examples.js';
import { createMakeCodeURL, MakeCodeFrameDriver, } from '../../vanilla/makecode-frame-driver.js';
import MakeCodeToolbar from '../MakeCodeToolbar.js';
import StoryWrapper from '../StoryWrapper.js';
const meta = {
    title: 'stories/VanillaJS/makeCodeFrameDriver',
};
export default meta;
const renderEditor = (args) => {
    const savedProjects = useRef(new Map());
    const ref = useRef(null);
    const cbRef = (div) => {
        if (!div) {
            return;
        }
        // Create an iframe element.
        const iframe = document.createElement('iframe');
        iframe.allow = 'usb; autoplay; camera; microphone;';
        iframe.src = createMakeCodeURL('https://makecode.calliope.cc', args.options?.version === 'default' ? undefined : args.options?.version, args.options?.lang, args.options?.controller ?? 1, args.options?.queryParams);
        iframe.width = '100%';
        iframe.height = '100%';
        div.appendChild(iframe);
        const savedProjects = new Map();
        // Create and initialise an instance of MakeCodeFrameDriver.
        ref.current = new MakeCodeFrameDriver({
            initialProjects: async () => (args.project ? [args.project] : []),
            onEditorContentLoaded: (e) => console.log('editorContentLoaded', e),
            onWorkspaceLoaded: (e) => console.log('workspaceLoaded', e),
            onWorkspaceSync: (e) => console.log('workspaceSync', e),
            onWorkspaceReset: (e) => console.log('workspaceReset', e),
            onWorkspaceEvent: (e) => console.log('workspaceEvent', e),
            onWorkspaceSave: (e) => {
                const headerId = e.project.header.id;
                savedProjects.set(headerId, e.project);
                console.log(savedProjects);
            },
            onTutorialEvent: (e) => console.log('tutorialEvent', e),
            ...(args.callbacks ?? {}),
        }, () => iframe);
        ref.current.initialize();
    };
    return (_jsxs(StoryWrapper, { children: [_jsx(MakeCodeToolbar, { savedProjects: savedProjects, driver: ref }), _jsx("div", { ref: cbRef, style: { flexGrow: 1 } })] }));
};
export const MakeCodeEditorWithControlsStory = {
    name: 'MakeCode Editor with controls',
    render: renderEditor,
    args: {
        options: { version: 'default', queryParams: { hideMenu: '' } },
        project: defaultMakeCodeProject,
    },
};
export const MakeCodeEditorControllerAppModeStory = {
    name: 'MakeCode Editor with controller=2 mode',
    render: renderEditor,
    args: {
        options: { version: 'default', controller: 2 },
        callbacks: {
            onDownload: (download) => console.log('download', download),
            onSave: (save) => console.log('save', save),
            onBack: () => console.log('back'),
            onBackLongPress: () => console.log('back long'),
        },
    },
};
//# sourceMappingURL=makecode-frame-driver.stories.js.map