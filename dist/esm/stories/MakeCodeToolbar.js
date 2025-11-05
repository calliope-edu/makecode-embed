import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { defaultMakeCodeProject } from '../vanilla/examples.js';
const toolbarRowStyle = {
    fontFamily: 'sans-serif',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    margin: '10px 0',
};
const MakeCodeToolbar = ({ driver, savedProjects, }) => {
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column' }, children: [_jsxs("div", { style: toolbarRowStyle, children: [_jsx("button", { onClick: () => driver.current.switchJavascript(), children: "Javascript" }), _jsx("button", { onClick: () => driver.current.switchBlocks(), children: "Blocks" }), _jsx("button", { onClick: async () => {
                            const info = await driver.current.info();
                            console.log(info);
                        }, children: "Info" }), _jsx("button", { onClick: () => driver.current.newProject(), children: "New project" }), _jsx("button", { onClick: () => driver.current.startActivity({
                            activityType: 'tutorial',
                            path: 'microbit-foundation/makecode-tutorials/first-lessons/step-counter',
                        }), children: "Load tutorial from GitHub" }), _jsx("button", { onClick: () => driver.current.print(), children: "Print" }), _jsx("button", { onClick: () => driver.current.pair(), children: "Pair" }), _jsx("button", { onClick: () => driver.current.compile(), children: "Compile" }), _jsx("button", { onClick: () => driver.current.saveProject(), children: "Save project" }), _jsx("button", { onClick: () => driver.current.unloadProject(), children: "Unload project" }), _jsx("button", { onClick: () => driver.current.openHeader([...savedProjects.current.values()][0].header.id), children: "Open header" }), _jsx("button", { onClick: () => driver.current.importProject({
                            project: defaultMakeCodeProject,
                        }), children: "Import project (no header)" }), _jsx("button", { onClick: async () => {
                            const result = await driver.current.shareProject({
                                headerId: [...savedProjects.current.values()][0].header.id,
                                projectName: 'Example project name',
                            });
                            console.log(result);
                        }, children: "Share project" }), _jsx("button", { onClick: () => driver.current.setLanguageRestriction('javascript-only'), children: "Set language restriction" }), _jsx("button", { onClick: async () => {
                            const result = await driver.current.getToolboxCategories({
                                advanced: true,
                            });
                            console.log(result);
                        }, children: "Get toolbox categories" }), _jsx("button", { onClick: () => driver.current.toggleDebugSloMo(), children: "Toggle debug slow mo" }), _jsx("button", { onClick: () => driver.current.toggleKeyboardControls(), children: "Keyboard controls" }), _jsx("button", { onClick: () => driver.current.toggleGreenScreen(), children: "Green screen" }), _jsx("button", { onClick: () => driver.current.toggleHighContrast(), children: "Contrast" }), _jsx("button", { onClick: () => driver.current.showThemePicker(), children: "Theme" }), _jsx("button", { onClick: () => driver.current.closeFlyout(), children: "Close flyout" })] }), _jsxs("div", { style: toolbarRowStyle, children: [_jsx("button", { onClick: async () => {
                            const result = await driver.current.renderBlocks({
                                ts: 'basic.showNumber(42)',
                            });
                            const img = document.body.appendChild(document.createElement('img'));
                            img.src = result;
                        }, children: "Render blocks" }), _jsx("button", { onClick: async () => {
                            const result = await driver.current.renderPython({
                                ts: 'basic.showNumber(42)',
                            });
                            console.log(result);
                        }, children: "Render Python" }), _jsx("button", { onClick: async () => {
                            const result = await driver.current.renderXml({
                                xml: defaultMakeCodeProject.text['main.blocks'],
                            });
                            const img = document.body.appendChild(document.createElement('img'));
                            img.src = result;
                        }, children: "Render XML" }), _jsx("button", { onClick: async () => {
                            const result = await driver.current.renderByBlockId({
                                blockId: 'basic_show_icon',
                            });
                            const img = document.body.appendChild(document.createElement('img'));
                            img.src = result;
                        }, children: "Render by block id" })] }), _jsxs("div", { style: toolbarRowStyle, children: [_jsxs("label", { children: ["File to import: ", _jsx("input", { type: "file", id: "importFile" })] }), _jsx("button", { onClick: async () => {
                            const importFile = document.querySelector('#importFile');
                            const file = importFile.files?.item(0);
                            if (file) {
                                const data = await file.arrayBuffer();
                                const text = new TextDecoder().decode(data);
                                driver.current.importFile({
                                    filename: file.name,
                                    parts: [text],
                                });
                            }
                        }, children: "Import file" })] }), _jsxs("div", { style: toolbarRowStyle, children: [_jsx("button", { onClick: () => driver.current.startSimulator(), children: "Start simulator" }), _jsx("button", { onClick: () => driver.current.stopSimulator(), children: "Stop simulator" }), _jsx("button", { onClick: () => driver.current.hideSimulator(), children: "Hide simulator" }), _jsx("button", { onClick: () => {
                            driver.current.setSimulatorFullScreen(true);
                        }, children: "Set simulator full screen" })] })] }));
};
export default MakeCodeToolbar;
//# sourceMappingURL=MakeCodeToolbar.js.map