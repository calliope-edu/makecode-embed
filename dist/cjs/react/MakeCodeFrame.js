"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("react");
const makecode_frame_driver_js_1 = require("../vanilla/makecode-frame-driver.js");
const styles = {
    iframe: {
        width: '100%',
        flexGrow: 1,
        border: 'none',
    },
};
const MakeCodeFrame = (0, react_2.forwardRef)(function MakeCode(props, ref) {
    const { baseUrl = 'https://makecode.calliope.cc', version, lang, controller, queryParams, initialProjects, controllerId, filters, searchBar, onDownload, onSave, onBack, onBackLongPress, onEditorContentLoaded, onWorkspaceLoaded, onWorkspaceSync, onWorkspaceReset, onWorkspaceEvent, onWorkspaceSave, onTutorialEvent, ...rest } = props;
    const options = (0, react_2.useMemo)(() => {
        return {
            initialProjects,
            controllerId,
            filters,
            searchBar,
            onDownload,
            onSave,
            onBack,
            onBackLongPress,
            onEditorContentLoaded,
            onWorkspaceLoaded,
            onWorkspaceSync,
            onWorkspaceReset,
            onWorkspaceEvent,
            onWorkspaceSave,
            onTutorialEvent,
        };
    }, [
        controllerId,
        filters,
        initialProjects,
        onBack,
        onBackLongPress,
        onDownload,
        onEditorContentLoaded,
        onSave,
        onTutorialEvent,
        onWorkspaceEvent,
        onWorkspaceLoaded,
        onWorkspaceReset,
        onWorkspaceSave,
        onWorkspaceSync,
        searchBar,
    ]);
    // Reload MakeCode if the URL changes
    const src = (0, makecode_frame_driver_js_1.createMakeCodeURL)(baseUrl, version, lang, controller, queryParams);
    return ((0, react_1.createElement)(MakeCodeFrameInner, { ...rest, ref: ref, key: src, src: src, options: options }));
});
const MakeCodeFrameInner = (0, react_2.forwardRef)(function MakeCodeFrameInner(props, ref) {
    const { options, style, ...rest } = props;
    const iframeRef = (0, react_2.useRef)(null);
    // We keep a fixed driver (which has state for messages) and update its options as needed.
    const driverRef = (0, react_2.useRef)(new makecode_frame_driver_js_1.MakeCodeFrameDriver(options, () => iframeRef.current ?? undefined));
    (0, react_2.useEffect)(() => {
        const driver = driverRef.current;
        driver.initialize();
        return () => {
            driver.dispose();
        };
    }, []);
    (0, react_2.useEffect)(() => {
        driverRef.current.setOptions(options);
    }, [options]);
    (0, react_2.useImperativeHandle)(ref, () => driverRef.current, []);
    return ((0, jsx_runtime_1.jsx)("iframe", { ref: iframeRef, title: "MakeCode", style: { ...styles.iframe, ...style }, allow: "usb; autoplay; camera; microphone;", ...rest }));
});
exports.default = MakeCodeFrame;
//# sourceMappingURL=MakeCodeFrame.js.map