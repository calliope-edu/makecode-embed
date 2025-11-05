import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, } from 'react';
import { createMakeCodeURL, MakeCodeFrameDriver, } from '../vanilla/makecode-frame-driver.js';
const styles = {
    iframe: {
        width: '100%',
        flexGrow: 1,
        border: 'none',
    },
};
const MakeCodeFrame = forwardRef(function MakeCode(props, ref) {
    const { baseUrl = 'https://makecode.calliope.cc', version, lang, controller, queryParams, initialProjects, controllerId, filters, searchBar, onDownload, onSave, onBack, onBackLongPress, onEditorContentLoaded, onWorkspaceLoaded, onWorkspaceSync, onWorkspaceReset, onWorkspaceEvent, onWorkspaceSave, onTutorialEvent, ...rest } = props;
    const options = useMemo(() => {
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
    const src = createMakeCodeURL(baseUrl, version, lang, controller, queryParams);
    return (_createElement(MakeCodeFrameInner, { ...rest, ref: ref, key: src, src: src, options: options }));
});
const MakeCodeFrameInner = forwardRef(function MakeCodeFrameInner(props, ref) {
    const { options, style, ...rest } = props;
    const iframeRef = useRef(null);
    // We keep a fixed driver (which has state for messages) and update its options as needed.
    const driverRef = useRef(new MakeCodeFrameDriver(options, () => iframeRef.current ?? undefined));
    useEffect(() => {
        const driver = driverRef.current;
        driver.initialize();
        return () => {
            driver.dispose();
        };
    }, []);
    useEffect(() => {
        driverRef.current.setOptions(options);
    }, [options]);
    useImperativeHandle(ref, () => driverRef.current, []);
    return (_jsx("iframe", { ref: iframeRef, title: "MakeCode", style: { ...styles.iframe, ...style }, allow: "usb; autoplay; camera; microphone;", ...rest }));
});
export default MakeCodeFrame;
//# sourceMappingURL=MakeCodeFrame.js.map