import { MutableRefObject, RefObject } from 'react';
import { MakeCodeFrameDriver } from '../vanilla/makecode-frame-driver.js';
import { MakeCodeProject } from '../vanilla/pxt.js';
declare const MakeCodeToolbar: ({ driver, savedProjects, }: {
    driver: RefObject<MakeCodeFrameDriver>;
    savedProjects: MutableRefObject<Map<string, MakeCodeProject>>;
}) => import("react/jsx-runtime").JSX.Element;
export default MakeCodeToolbar;
