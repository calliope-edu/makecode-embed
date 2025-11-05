import { Meta, StoryObj } from '@storybook/react';
import { Options } from '../../vanilla/makecode-frame-driver.js';
import { MakeCodeProject } from '../../vanilla/pxt.js';
interface StoryArgs {
    options?: {
        version?: string;
        lang?: string;
        controller?: 1 | 2;
        queryParams?: Record<string, string>;
    };
    project?: MakeCodeProject;
    callbacks?: Partial<Options>;
}
declare const meta: Meta<StoryArgs>;
export default meta;
type Story = StoryObj<StoryArgs>;
export declare const MakeCodeEditorWithControlsStory: Story;
export declare const MakeCodeEditorControllerAppModeStory: Story;
