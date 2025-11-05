"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialBlankProject = exports.CustomBlock = exports.ExtensionBlockDatalogging = exports.ExtensionBlockTwo = exports.ExtensionBlockSingle = exports.Melody = exports.XML = exports.Simple = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const makecode_render_blocks_js_1 = require("../../vanilla/makecode-render-blocks.js");
const fixtures_js_1 = require("../fixtures.js");
const StoryWrapper_js_1 = __importDefault(require("../StoryWrapper.js"));
const meta = {
    title: 'stories/VanillaJS/createMakeCodeRenderBlocks',
};
exports.default = meta;
const renderBlocks = (args) => {
    const cbRef = (e) => {
        if (!e) {
            return;
        }
        const renderer = (0, makecode_render_blocks_js_1.createMakeCodeRenderBlocks)(args.options ?? {});
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
    return ((0, jsx_runtime_1.jsx)(StoryWrapper_js_1.default, { children: (0, jsx_runtime_1.jsx)("div", { ref: cbRef, children: "Loading..." }) }));
};
exports.Simple = {
    render: renderBlocks,
    args: { project: fixtures_js_1.project },
};
exports.XML = {
    render: renderBlocks,
    args: { project: fixtures_js_1.projectWithLayout },
};
exports.Melody = {
    render: renderBlocks,
    args: { project: fixtures_js_1.projectWithMelody },
};
exports.ExtensionBlockSingle = {
    render: renderBlocks,
    args: { project: fixtures_js_1.projectWithExtensionBlock },
};
exports.ExtensionBlockTwo = {
    render: renderBlocks,
    args: { project: fixtures_js_1.projectWithTwoExtensions },
};
exports.ExtensionBlockDatalogging = {
    render: renderBlocks,
    args: { project: fixtures_js_1.projectWithDatalogging },
};
exports.CustomBlock = {
    render: renderBlocks,
    args: { project: fixtures_js_1.projectWithCustomBlock },
};
exports.InitialBlankProject = {
    render: renderBlocks,
    args: { project: fixtures_js_1.initialProject },
};
//# sourceMappingURL=makecode-render-blocks.stories.js.map