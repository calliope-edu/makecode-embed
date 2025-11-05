import { Meta, StoryObj } from '@storybook/react';
import { MakeCodeRenderBlocksOptions } from '../../vanilla/makecode-render-blocks.js';
import { MakeCodeProject } from '../../vanilla/pxt.js';
interface StoryArgs {
    options: MakeCodeRenderBlocksOptions | undefined;
    project: MakeCodeProject;
}
declare const meta: Meta<StoryArgs>;
export default meta;
type Story = StoryObj<StoryArgs>;
export declare const Simple: Story;
export declare const XML: Story;
export declare const Melody: Story;
export declare const ExtensionBlockSingle: Story;
export declare const ExtensionBlockTwo: Story;
export declare const ExtensionBlockDatalogging: Story;
export declare const CustomBlock: Story;
export declare const InitialBlankProject: Story;
