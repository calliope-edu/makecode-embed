"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeCodeEditorControllerAppModeStory = exports.MakeCodeEditorWithControlsStory = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const examples_js_1 = require("../../vanilla/examples.js");
const MakeCodeFrame_js_1 = __importDefault(require("../../react/MakeCodeFrame.js"));
const config_js_1 = require("../config.js");
const StoryWrapper_js_1 = __importDefault(require("../StoryWrapper.js"));
const MakeCodeToolbar_js_1 = __importDefault(require("../MakeCodeToolbar.js"));
const meta = {
    title: 'stories/React/MakeCodeFrame',
    component: MakeCodeFrame_js_1.default,
    argTypes: {
        version: {
            options: ['default', 'beta'],
            defaultValue: undefined,
            name: 'version',
            control: { type: 'radio' },
        },
    },
};
exports.default = meta;
const MakeCodeEditorWithControls = (props) => {
    const savedProjects = (0, react_1.useRef)(new Map());
    const ref = (0, react_1.useRef)(null);
    const initialProjects = (0, react_1.useCallback)(async () => {
        if (savedProjects.current.size === 0) {
            // Maybe we can switch to using newProject instead?
            return [examples_js_1.defaultMakeCodeProject];
        }
        return [...savedProjects.current.values()];
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(MakeCodeToolbar_js_1.default, { savedProjects: savedProjects, driver: ref }), (0, jsx_runtime_1.jsx)(MakeCodeFrame_js_1.default, { ref: ref, controller: 1, controllerId: config_js_1.controllerId, initialProjects: initialProjects, onEditorContentLoaded: (e) => console.log('editorContentLoaded', e), onWorkspaceLoaded: (e) => console.log('workspaceLoaded', e), onWorkspaceSync: (e) => console.log('workspaceSync', e), onWorkspaceReset: (e) => console.log('workspaceReset', e), onWorkspaceEvent: (e) => console.log('workspaceEvent', e), onWorkspaceSave: (e) => {
                    savedProjects.current?.set(e.project.header.id, e.project);
                    console.log(savedProjects.current);
                }, onTutorialEvent: (e) => console.log('tutorialEvent', e), ...props })] }));
};
exports.MakeCodeEditorWithControlsStory = {
    name: 'MakeCode Editor with controls',
    args: {
        version: 'default',
    },
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper_js_1.default, { children: (0, jsx_runtime_1.jsx)(MakeCodeEditorWithControls, { version: version === 'default' ? undefined : version, 
                // TODO: make this an argument and perhaps a real prop
                queryParams: { hideMenu: '' } }) }));
    },
};
exports.MakeCodeEditorControllerAppModeStory = {
    name: 'MakeCode Editor with controller=2 mode',
    args: {
        version: 'default',
    },
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper_js_1.default, { children: (0, jsx_runtime_1.jsx)(MakeCodeEditorWithControls, { controller: 2, controllerId: config_js_1.controllerId, version: version === 'default' ? undefined : version, 
                // App specific events
                onDownload: (download) => console.log('download', download), onSave: (save) => console.log('save', save), onBack: () => console.log('back'), onBackLongPress: () => console.log('back long') }) }));
    },
};
//# sourceMappingURL=MakeCodeFrame.stories.js.map