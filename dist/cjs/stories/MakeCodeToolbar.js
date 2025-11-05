"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const examples_js_1 = require("../vanilla/examples.js");
const toolbarRowStyle = {
    fontFamily: 'sans-serif',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    margin: '10px 0',
};
const MakeCodeToolbar = ({ driver, savedProjects, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: toolbarRowStyle, children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.switchJavascript(), children: "Javascript" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.switchBlocks(), children: "Blocks" }), (0, jsx_runtime_1.jsx)("button", { onClick: async () => {
                            const info = await driver.current.info();
                            console.log(info);
                        }, children: "Info" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.newProject(), children: "New project" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.startActivity({
                            activityType: 'tutorial',
                            path: 'microbit-foundation/makecode-tutorials/first-lessons/step-counter',
                        }), children: "Load tutorial from GitHub" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.print(), children: "Print" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.pair(), children: "Pair" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.compile(), children: "Compile" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.saveProject(), children: "Save project" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.unloadProject(), children: "Unload project" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.openHeader([...savedProjects.current.values()][0].header.id), children: "Open header" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.importProject({
                            project: examples_js_1.defaultMakeCodeProject,
                        }), children: "Import project (no header)" }), (0, jsx_runtime_1.jsx)("button", { onClick: async () => {
                            const result = await driver.current.shareProject({
                                headerId: [...savedProjects.current.values()][0].header.id,
                                projectName: 'Example project name',
                            });
                            console.log(result);
                        }, children: "Share project" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.setLanguageRestriction('javascript-only'), children: "Set language restriction" }), (0, jsx_runtime_1.jsx)("button", { onClick: async () => {
                            const result = await driver.current.getToolboxCategories({
                                advanced: true,
                            });
                            console.log(result);
                        }, children: "Get toolbox categories" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.toggleDebugSloMo(), children: "Toggle debug slow mo" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.toggleKeyboardControls(), children: "Keyboard controls" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.toggleGreenScreen(), children: "Green screen" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.toggleHighContrast(), children: "Contrast" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.showThemePicker(), children: "Theme" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.closeFlyout(), children: "Close flyout" })] }), (0, jsx_runtime_1.jsxs)("div", { style: toolbarRowStyle, children: [(0, jsx_runtime_1.jsx)("button", { onClick: async () => {
                            const result = await driver.current.renderBlocks({
                                ts: 'basic.showNumber(42)',
                            });
                            const img = document.body.appendChild(document.createElement('img'));
                            img.src = result;
                        }, children: "Render blocks" }), (0, jsx_runtime_1.jsx)("button", { onClick: async () => {
                            const result = await driver.current.renderPython({
                                ts: 'basic.showNumber(42)',
                            });
                            console.log(result);
                        }, children: "Render Python" }), (0, jsx_runtime_1.jsx)("button", { onClick: async () => {
                            const result = await driver.current.renderXml({
                                xml: examples_js_1.defaultMakeCodeProject.text['main.blocks'],
                            });
                            const img = document.body.appendChild(document.createElement('img'));
                            img.src = result;
                        }, children: "Render XML" }), (0, jsx_runtime_1.jsx)("button", { onClick: async () => {
                            const result = await driver.current.renderByBlockId({
                                blockId: 'basic_show_icon',
                            });
                            const img = document.body.appendChild(document.createElement('img'));
                            img.src = result;
                        }, children: "Render by block id" })] }), (0, jsx_runtime_1.jsxs)("div", { style: toolbarRowStyle, children: [(0, jsx_runtime_1.jsxs)("label", { children: ["File to import: ", (0, jsx_runtime_1.jsx)("input", { type: "file", id: "importFile" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: async () => {
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
                        }, children: "Import file" })] }), (0, jsx_runtime_1.jsxs)("div", { style: toolbarRowStyle, children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.startSimulator(), children: "Start simulator" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.stopSimulator(), children: "Stop simulator" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => driver.current.hideSimulator(), children: "Hide simulator" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                            driver.current.setSimulatorFullScreen(true);
                        }, children: "Set simulator full screen" })] })] }));
};
exports.default = MakeCodeToolbar;
//# sourceMappingURL=MakeCodeToolbar.js.map