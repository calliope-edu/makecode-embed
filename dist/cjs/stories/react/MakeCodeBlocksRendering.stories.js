"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespectUserLayout = exports.EmptyToBlocksTransition = exports.EmptyString = exports.InitialBlankProject = exports.Robust = exports.Error = exports.CustomBlock = exports.ExtensionBlockDatalogging = exports.ExtensionBlockStrawbees = exports.ExtensionBlockTwo = exports.ExtensionBlockSingle = exports.Melody = exports.Published = exports.XML = exports.Simple = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const MakeCodeBlocksRendering_js_1 = __importDefault(require("../../react/MakeCodeBlocksRendering.js"));
const MakeCodeRenderBlocksProvider_js_1 = require("../../react/MakeCodeRenderBlocksProvider.js");
const pxt_js_1 = require("../../vanilla/pxt.js");
const fixtures_js_1 = require("../fixtures.js");
const meta = {
    title: 'stories/React/MakeCodeBlocksRendering',
    component: MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider,
    argTypes: {
        version: {
            options: ['default', 'beta'],
            defaultValue: 'default',
            control: { type: 'radio' },
        },
    },
};
exports.default = meta;
const StoryWrapper = (props) => ((0, jsx_runtime_1.jsx)("div", { style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 700,
    }, children: props.children }));
const adaptStorybookVersion = (version) => {
    return version && version !== 'default' ? version : undefined;
};
exports.Simple = {
    render: ({ version }) => {
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.project.text['main.ts'] }) }) }, version));
    },
};
exports.XML = {
    render: ({ version }) => {
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.projectWithLayout }) }) }, version));
    },
};
exports.Published = {
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { packageId: "_iHY3J9371HLf" }) }) }, version));
    },
};
exports.Melody = {
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.projectWithMelody }) }) }, version));
    },
};
exports.ExtensionBlockSingle = {
    name: 'Extension block (single)',
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.projectWithExtensionBlock }) }) }, version));
    },
};
exports.ExtensionBlockTwo = {
    name: 'Extension block (two different)',
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.projectWithTwoExtensions }) }) }, version));
    },
};
exports.ExtensionBlockStrawbees = {
    name: 'Extension block (Strawbees - spaces in name)',
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.strawbeesExample }) }) }, version));
    },
};
exports.ExtensionBlockDatalogging = {
    name: 'Extension block (Datalogging)',
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.projectWithDatalogging }) }) }, version));
    },
};
exports.CustomBlock = {
    name: 'Custom block',
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.projectWithCustomBlock }) }) }, version));
    },
};
exports.Error = {
    render: () => {
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: "intentional-404", children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.project.text['main.ts'] }) }) }));
    },
};
exports.Robust = {
    name: 'Robust against invalid/empty project',
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: {} }) }) }, version));
    },
};
exports.InitialBlankProject = {
    name: 'Initial blank project',
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.initialProject }) }) }, version));
    },
};
exports.EmptyString = {
    name: 'Empty string',
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: "" }) }) }, version));
    },
};
exports.EmptyToBlocksTransition = {
    name: 'Empty to blocks transition',
    render: (args) => {
        const { version } = args;
        const [project, setProject] = (0, react_1.useState)(fixtures_js_1.initialProject);
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: '50% 50%' }, children: [(0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: project }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { onClick: () => setProject(project === fixtures_js_1.projectWithLayout
                                ? fixtures_js_1.initialProject
                                : fixtures_js_1.projectWithLayout), children: "Update" }) })] }) }, version));
    },
};
exports.RespectUserLayout = {
    name: 'Respect user layout',
    render: (args) => {
        const { version } = args;
        return ((0, jsx_runtime_1.jsx)(StoryWrapper, { children: (0, jsx_runtime_1.jsx)(MakeCodeRenderBlocksProvider_js_1.MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: (0, jsx_runtime_1.jsx)(MakeCodeBlocksRendering_js_1.default, { code: fixtures_js_1.projectWithUserLayout, layout: pxt_js_1.BlockLayout.Clean }) }) }, version));
    },
};
//# sourceMappingURL=MakeCodeBlocksRendering.stories.js.map