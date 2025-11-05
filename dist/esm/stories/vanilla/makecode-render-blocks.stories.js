import { jsx as _jsx } from "react/jsx-runtime";
import { createMakeCodeRenderBlocks, } from '../../vanilla/makecode-render-blocks.js';
import { initialProject, project, projectWithCustomBlock, projectWithDatalogging, projectWithExtensionBlock, projectWithLayout, projectWithMelody, projectWithTwoExtensions, } from '../fixtures.js';
import StoryWrapper from '../StoryWrapper.js';
const meta = {
    title: 'stories/VanillaJS/createMakeCodeRenderBlocks',
};
export default meta;
const renderBlocks = (args) => {
    const cbRef = (e) => {
        if (!e) {
            return;
        }
        const renderer = createMakeCodeRenderBlocks(args.options ?? {});
        renderer.initialize();
        renderer.renderBlocks({ code: args.project }).then((r) => {
            if (r.svg) {
                e.innerHTML = `
        <div>
          ${r.svg}
        </div>
      `;
            }
        });
    };
    return (_jsx(StoryWrapper, { children: _jsx("div", { ref: cbRef, children: "Loading..." }) }));
};
export const Simple = {
    render: renderBlocks,
    args: { project: project },
};
export const XML = {
    render: renderBlocks,
    args: { project: projectWithLayout },
};
export const Melody = {
    render: renderBlocks,
    args: { project: projectWithMelody },
};
export const ExtensionBlockSingle = {
    render: renderBlocks,
    args: { project: projectWithExtensionBlock },
};
export const ExtensionBlockTwo = {
    render: renderBlocks,
    args: { project: projectWithTwoExtensions },
};
export const ExtensionBlockDatalogging = {
    render: renderBlocks,
    args: { project: projectWithDatalogging },
};
export const CustomBlock = {
    render: renderBlocks,
    args: { project: projectWithCustomBlock },
};
export const InitialBlankProject = {
    render: renderBlocks,
    args: { project: initialProject },
};
//# sourceMappingURL=makecode-render-blocks.stories.js.map