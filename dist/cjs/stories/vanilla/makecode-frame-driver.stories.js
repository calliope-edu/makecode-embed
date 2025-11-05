"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeCodeEditorControllerAppModeStory = exports.MakeCodeEditorWithControlsStory = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const examples_js_1 = require("../../vanilla/examples.js");
const makecode_frame_driver_js_1 = require("../../vanilla/makecode-frame-driver.js");
const MakeCodeToolbar_js_1 = __importDefault(require("../MakeCodeToolbar.js"));
const StoryWrapper_js_1 = __importDefault(require("../StoryWrapper.js"));
const meta = {
    title: 'stories/VanillaJS/makeCodeFrameDriver',
};
exports.default = meta;
const renderEditor = (args) => {
    const savedProjects = (0, react_1.useRef)(new Map());
    const ref = (0, react_1.useRef)(null);
    const cbRef = (div) => {
        if (!div) {
            return;
        }
        // Create an iframe element.
        const iframe = document.createElement('iframe');
        iframe.allow = 'usb; autoplay; camera; microphone;';
        iframe.src = (0, makecode_frame_driver_js_1.createMakeCodeURL)('https://makecode.calliope.cc', args.options?.version === 'default' ? undefined : args.options?.version, args.options?.lang, args.options?.controller ?? 1, args.options?.queryParams);
        iframe.width = '100%';
        iframe.height = '100%';
        div.appendChild(iframe);
        const savedProjects = new Map();
        // Create and initialise an instance of MakeCodeFrameDriver.
        ref.current = new makecode_frame_driver_js_1.MakeCodeFrameDriver({
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
    return ((0, jsx_runtime_1.jsxs)(StoryWrapper_js_1.default, { children: [(0, jsx_runtime_1.jsx)(MakeCodeToolbar_js_1.default, { savedProjects: savedProjects, driver: ref }), (0, jsx_runtime_1.jsx)("div", { ref: cbRef, style: { flexGrow: 1 } })] }));
};
exports.MakeCodeEditorWithControlsStory = {
    name: 'MakeCode Editor with controls',
    render: renderEditor,
    args: {
        options: { version: 'default', queryParams: { hideMenu: '' } },
        project: examples_js_1.defaultMakeCodeProject,
    },
};
exports.MakeCodeEditorControllerAppModeStory = {
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