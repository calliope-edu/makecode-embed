import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import MakeCodeBlocksRendering from '../../react/MakeCodeBlocksRendering.js';
import { MakeCodeRenderBlocksProvider } from '../../react/MakeCodeRenderBlocksProvider.js';
import { BlockLayout } from '../../vanilla/pxt.js';
import { initialProject, project, projectWithCustomBlock, projectWithDatalogging, projectWithExtensionBlock, projectWithLayout, projectWithMelody, projectWithTwoExtensions, projectWithUserLayout, strawbeesExample, } from '../fixtures.js';
const meta = {
    title: 'stories/React/MakeCodeBlocksRendering',
    component: MakeCodeRenderBlocksProvider,
    argTypes: {
        version: {
            options: ['default', 'beta'],
            defaultValue: 'default',
            control: { type: 'radio' },
        },
    },
};
export default meta;
const StoryWrapper = (props) => (_jsx("div", { style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 700,
    }, children: props.children }));
const adaptStorybookVersion = (version) => {
    return version && version !== 'default' ? version : undefined;
};
export const Simple = {
    render: ({ version }) => {
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: project.text['main.ts'] }) }) }, version));
    },
};
export const XML = {
    render: ({ version }) => {
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: projectWithLayout }) }) }, version));
    },
};
export const Published = {
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { packageId: "_iHY3J9371HLf" }) }) }, version));
    },
};
export const Melody = {
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: projectWithMelody }) }) }, version));
    },
};
export const ExtensionBlockSingle = {
    name: 'Extension block (single)',
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: projectWithExtensionBlock }) }) }, version));
    },
};
export const ExtensionBlockTwo = {
    name: 'Extension block (two different)',
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: projectWithTwoExtensions }) }) }, version));
    },
};
export const ExtensionBlockStrawbees = {
    name: 'Extension block (Strawbees - spaces in name)',
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: strawbeesExample }) }) }, version));
    },
};
export const ExtensionBlockDatalogging = {
    name: 'Extension block (Datalogging)',
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: projectWithDatalogging }) }) }, version));
    },
};
export const CustomBlock = {
    name: 'Custom block',
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: projectWithCustomBlock }) }) }, version));
    },
};
export const Error = {
    render: () => {
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: "intentional-404", children: _jsx(MakeCodeBlocksRendering, { code: project.text['main.ts'] }) }) }));
    },
};
export const Robust = {
    name: 'Robust against invalid/empty project',
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: {} }) }) }, version));
    },
};
export const InitialBlankProject = {
    name: 'Initial blank project',
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: initialProject }) }) }, version));
    },
};
export const EmptyString = {
    name: 'Empty string',
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: "" }) }) }, version));
    },
};
export const EmptyToBlocksTransition = {
    name: 'Empty to blocks transition',
    render: (args) => {
        const { version } = args;
        const [project, setProject] = useState(initialProject);
        return (_jsx(StoryWrapper, { children: _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '50% 50%' }, children: [_jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: project }) }), _jsx("div", { children: _jsx("button", { onClick: () => setProject(project === projectWithLayout
                                ? initialProject
                                : projectWithLayout), children: "Update" }) })] }) }, version));
    },
};
export const RespectUserLayout = {
    name: 'Respect user layout',
    render: (args) => {
        const { version } = args;
        return (_jsx(StoryWrapper, { children: _jsx(MakeCodeRenderBlocksProvider, { version: adaptStorybookVersion(version), children: _jsx(MakeCodeBlocksRendering, { code: projectWithUserLayout, layout: BlockLayout.Clean }) }) }, version));
    },
};
//# sourceMappingURL=MakeCodeBlocksRendering.stories.js.map