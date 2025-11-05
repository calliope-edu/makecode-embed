/**
 * MakeCode/pxt types needed for the iframe messages.
 *
 * These are substantially derived from the PXT project. The types are hard to use
 * directly due to logical splits that make sense for MakeCode internally, but not
 * for this interface, and TypeScript features that make them hard to reuse in a
 * library context: namespaces and const enums.
 *
 * We've also extracted interfaces for the request parameters separately from the
 * request metadata and corrected some types that don't appear to behave as
 * described.
 *
 * Original is Copyright (c) Microsoft Corporation
 * MIT licensed: https://github.com/microsoft/pxt/blob/master/LICENSE
 *
 * Modifications are Copright (c) Micro:bit Educational Foundation and contributors
 * 2024.
 */
export interface InstallHeader {
    name: string;
    meta: {
        blocksWidth?: number;
        blocksHeight?: number;
        versions?: TargetVersions;
    };
    editor: string;
    board?: string;
    temporary?: boolean;
    target: string;
    targetVersion: string;
    pubId: string;
    pubCurrent: boolean;
    pubVersions?: {
        id: string;
        type: 'snapshot' | 'permalink';
    }[];
    pubPermalink?: string;
    anonymousSharePreference?: boolean;
    githubId?: string;
    githubTag?: string;
    githubCurrent?: boolean;
    tutorial?: TutorialOptions;
    tutorialCompleted?: {
        id: string;
        steps: number;
    };
    extensionUnderTest?: string;
    cloudUserId?: string;
    isSkillmapProject?: boolean;
}
export interface Header extends InstallHeader {
    id: string;
    path?: string;
    recentUse: number;
    modificationTime: number;
    icon?: string;
    isDeleted: boolean;
    saveId?: any;
    cloudVersion: string;
    cloudCurrent: boolean;
    cloudLastSyncTime: number;
    backupRef?: string;
    isBackup?: boolean;
    _rev: string;
}
export type ScriptText = Record<string, string>;
export interface MakeCodeProject {
    header?: Header;
    text?: ScriptText;
}
export interface Asset {
    name: string;
    size: number;
    url: string;
}
export type Version = any;
export interface File {
    header: Header;
    text: ScriptText;
    version: Version;
}
export interface EditorMessage {
    /**
     * Constant identifier
     */
    type: 'pxteditor' | 'pxthost' | 'pxtpkgext' | 'pxtsim';
    /**
     * Original request id
     */
    id?: string;
    /**
     * flag to request response
     */
    response?: boolean;
    /**
     * Frame identifier that can be passed to the iframe by adding the frameId query parameter
     */
    frameId?: string;
}
export interface EditorMessageResponse extends EditorMessage {
    /**
     * Additional response payload provided by the command
     */
    resp?: any;
    /**
     * indicate if operation started or completed successfully
     */
    success: boolean;
    /**
     * Error object if any
     */
    error?: any;
}
export interface EditorMessageRequest extends EditorMessage {
    /**
     * Request action
     */
    action: 'switchblocks' | 'switchjavascript' | 'switchpython' | 'startsimulator' | 'restartsimulator' | 'stopsimulator' | 'hidesimulator' | 'showsimulator' | 'closeflyout' | 'newproject' | 'importproject' | 'importexternalproject' | 'importtutorial' | 'openheader' | 'proxytosim' | 'undo' | 'redo' | 'renderblocks' | 'renderpython' | 'renderxml' | 'renderbyblockid' | 'setscale' | 'startactivity' | 'saveproject' | 'compile' | 'unloadproject' | 'shareproject' | 'savelocalprojectstocloud' | 'projectcloudstatus' | 'requestprojectcloudstatus' | 'convertcloudprojectstolocal' | 'setlanguagerestriction' | 'gettoolboxcategories' | 'toggletrace' | 'showthemepicker' | 'togglehighcontrast' | 'sethighcontrast' | 'togglegreenscreen' | 'togglekeyboardcontrols' | 'settracestate' | 'setsimulatorfullscreen' | 'print' | 'pair' | 'workspacesync' | 'workspacereset' | 'workspacesave' | 'workspaceloaded' | 'workspaceevent' | 'workspacediagnostics' | 'event' | 'simevent' | 'info' | 'tutorialevent' | 'editorcontentloaded' | 'serviceworkerregistered' | 'runeval';
}
/**
 * Request sent by the editor when a tick/error/expection is registered
 */
export interface EditorMessageEventRequest extends EditorMessageRequest {
    action: 'event';
    tick: string;
    category?: string;
    message?: string;
    data?: Record<string, string | number>;
}
export type EditorMessageTutorialEventRequest = EditorMessageTutorialProgressEventRequest | EditorMessageTutorialCompletedEventRequest | EditorMessageTutorialLoadedEventRequest | EditorMessageTutorialExitEventRequest;
export interface EditorMessageTutorialProgressEventRequest extends EditorMessageRequest {
    action: 'tutorialevent';
    tutorialEvent: 'progress';
    currentStep: number;
    totalSteps: number;
    isCompleted: boolean;
    tutorialId: string;
    projectHeaderId: string;
}
export interface EditorMessageTutorialCompletedEventRequest extends EditorMessageRequest {
    action: 'tutorialevent';
    tutorialEvent: 'completed';
    tutorialId: string;
    projectHeaderId: string;
}
export interface EditorMessageTutorialLoadedEventRequest extends EditorMessageRequest {
    action: 'tutorialevent';
    tutorialEvent: 'loaded';
    tutorialId: string;
    projectHeaderId: string;
}
export interface EditorMessageTutorialExitEventRequest extends EditorMessageRequest {
    action: 'tutorialevent';
    tutorialEvent: 'exit';
    tutorialId: string;
    projectHeaderId: string;
}
export interface EditorMessageStopRequest extends EditorMessageRequest {
    action: 'stopsimulator';
    /**
     * Indicates if simulator iframes should be unloaded or kept hot.
     */
    unload?: boolean;
}
export interface EditorMessageNewProjectRequest extends EditorMessageRequest {
    action: 'newproject';
    /**
     * Additional optional to create new project
     */
    options?: ProjectCreationOptions;
}
export interface EditorContentLoadedRequest extends EditorMessageRequest {
    action: 'editorcontentloaded';
}
export interface EditorMessageSetScaleRequest extends EditorMessageRequest {
    action: 'setscale';
    scale: number;
}
export interface EditorMessageSimulatorMessageProxyRequest extends EditorMessageRequest {
    action: 'proxytosim';
    /**
     * Content to send to the simulator
     */
    content: any;
}
export interface EditorWorkspaceSyncRequest extends EditorMessageRequest {
    /**
     * Synching projects from host into
     */
    action: 'workspacesync' | 'workspacereset' | 'workspaceloaded';
}
export interface EditorWorkspaceEvent extends EditorMessageRequest {
    action: 'workspaceevent';
    event: EditorEvent;
}
export interface EditorWorkspaceDiagnostics extends EditorMessageRequest {
    action: 'workspacediagnostics';
    operation: 'compile' | 'decompile' | 'typecheck';
    output: string;
    diagnostics: {
        code: number;
        category: 'error' | 'warning' | 'message';
        fileName?: string;
        start?: number;
        length?: number;
        line?: number;
        column?: number;
        endLine?: number;
        endColumn?: number;
    }[];
}
export interface EditorSyncState {
    filters?: ProjectFilters;
    searchBar?: boolean;
}
export interface EditorWorkspaceSyncResponse extends EditorMessageResponse {
    projects: MakeCodeProject[];
    editor?: EditorSyncState;
    controllerId?: string;
}
export interface EditorWorkspaceSaveRequest extends EditorMessageRequest {
    action: 'workspacesave';
    project: MakeCodeProject;
}
export interface ImportProjectOptions {
    project: MakeCodeProject;
    filters?: ProjectFilters;
    searchBar?: boolean;
}
export interface EditorMessageImportProjectRequest extends EditorMessageRequest, ImportProjectOptions {
    action: 'importproject';
}
export interface ImportExternalProjectOptions {
    project: MakeCodeProject;
}
export interface EditorMessageImportExternalProjectRequest extends EditorMessageRequest, ImportExternalProjectOptions {
    action: 'importexternalproject';
}
export interface EditorMessageImportExternalProjectResponse extends EditorMessageResponse {
    action: 'importexternalproject';
    resp: {
        importUrl: string;
    };
}
export interface EditorMessageSaveLocalProjectsToCloud extends EditorMessageRequest {
    action: 'savelocalprojectstocloud';
    headerIds: string[];
}
export interface EditorMessageSaveLocalProjectsToCloudResponse extends EditorMessageResponse {
    action: 'savelocalprojectstocloud';
    headerIdMap?: Record<string, string>;
}
export interface EditorMessageProjectCloudStatus extends EditorMessageRequest {
    action: 'projectcloudstatus';
    headerId: string;
    status: CloudStatus;
}
export interface EditorMessageRequestProjectCloudStatus extends EditorMessageRequest {
    action: 'requestprojectcloudstatus';
    headerIds: string[];
}
export interface EditorMessageConvertCloudProjectsToLocal extends EditorMessageRequest {
    action: 'convertcloudprojectstolocal';
    userId: string;
}
export interface EditorMessageImportTutorialRequest extends EditorMessageRequest {
    action: 'importtutorial';
    markdown: string;
}
export interface EditorMessageOpenHeaderRequest extends EditorMessageRequest {
    action: 'openheader';
    headerId: string;
}
export interface RenderBlocksOptions {
    ts: string;
    snippetMode?: boolean;
    layout?: BlockLayout;
}
export interface EditorMessageRenderBlocksRequest extends EditorMessageRequest, RenderBlocksOptions {
    action: 'renderblocks';
}
export interface RenderXmlOptions {
    xml: string;
    snippetMode?: boolean;
    layout?: BlockLayout;
}
export interface EditorMessageRenderXmlRequest extends EditorMessageRequest, RenderXmlOptions {
    action: 'renderxml';
}
export interface RenderByBlockIdOptions {
    blockId: string;
    snippetMode?: boolean;
    layout?: BlockLayout;
}
export interface EditorMessageRenderByBlockIdRequest extends EditorMessageRequest, RenderByBlockIdOptions {
    action: 'renderbyblockid';
}
export interface EditorMessageRenderBlocksResponse {
    resp: string | undefined;
}
export interface EditorMessageRenderXmlResponse {
    resp: string | undefined;
}
export interface EditorMessageRenderByBlockIdResponse {
    resp: string | undefined;
}
export interface EditorMessageRenderPythonRequest extends EditorMessageRequest {
    action: 'renderpython';
    ts: string;
}
export interface EditorMessageRenderPythonResponse {
    resp: string;
}
export interface EditorSimulatorEvent extends EditorMessageRequest {
    action: 'simevent';
    subtype: 'toplevelfinished' | 'started' | 'stopped' | 'resumed';
}
export interface EditorSimulatorStoppedEvent extends EditorSimulatorEvent {
    subtype: 'stopped';
    exception?: string;
}
export interface EditorMessageToggleTraceRequest extends EditorMessageRequest {
    action: 'toggletrace';
    intervalSpeed?: number;
}
export interface EditorMessageSetTraceStateRequest extends EditorMessageRequest {
    action: 'settracestate';
    enabled: boolean;
    intervalSpeed?: number;
}
export interface EditorMessageSetSimulatorFullScreenRequest extends EditorMessageRequest {
    action: 'setsimulatorfullscreen';
    enabled: boolean;
}
export interface EditorMessageSetHighContrastRequest extends EditorMessageRequest {
    action: 'sethighcontrast';
    on: boolean;
}
export interface StartActivityOptions {
    activityType: 'tutorial' | 'example' | 'recipe';
    path: string;
    title?: string;
    previousProjectHeaderId?: string;
    carryoverPreviousCode?: boolean;
}
export interface EditorMessageStartActivity extends EditorMessageRequest, StartActivityOptions {
    action: 'startactivity';
}
export interface InfoMessage {
    versions: TargetVersions;
    locale: string;
    availableLocales?: string[];
    keyboardControls: boolean;
}
export interface PackageExtensionData {
    ts: string;
    json?: any;
}
export interface EditorPkgExtMessageRequest extends EditorMessageRequest {
    package: string;
}
export interface EditorPkgExtMessageResponse extends EditorMessageResponse {
    package: string;
}
export interface EditorSimulatorTickEvent extends EditorMessageEventRequest {
    type: 'pxtsim';
}
export interface EditorShareRequest extends EditorMessageRequest {
    action: 'shareproject';
    headerId: string;
    projectName: string;
}
export interface ShareResult {
    embed: {
        code: string;
        editor: string;
        simulator: string;
    };
    qr: string;
    url: string;
}
export interface EditorShareResponse extends EditorMessageResponse {
    action: 'shareproject';
    resp: ShareResult;
}
export interface EditorSetLanguageRestriction extends EditorMessageRequest {
    action: 'setlanguagerestriction';
    restriction: LanguageRestriction;
}
export interface EditorMessageGetToolboxCategoriesRequest extends EditorMessageRequest {
    action: 'gettoolboxcategories';
    advanced?: boolean;
}
export interface EditorMessageServiceWorkerRegisteredRequest extends EditorMessageRequest {
    action: 'serviceworkerregistered';
}
export interface EditorMessageGetToolboxCategoriesResponse {
    categories: ToolboxCategoryDefinition[];
}
export interface ProjectTemplate {
    id: string;
    config: PackageConfig;
    files: Record<string, string>;
}
export interface ProjectCreationOptions {
    prj?: ProjectTemplate;
    name?: string;
    documentation?: string;
    filesOverride?: Record<string, string>;
    filters?: ProjectFilters;
    temporary?: boolean;
    tutorial?: TutorialOptions;
    dependencies?: Record<string, string>;
    tsOnly?: boolean;
    languageRestriction?: LanguageRestriction;
    preferredEditor?: string;
    extensionUnderTest?: string;
    skillmapProject?: boolean;
    simTheme?: Partial<PackageConfig>;
    firstProject?: boolean;
}
export interface ProjectFilters {
    namespaces?: {
        [index: string]: FilterState;
    };
    blocks?: {
        [index: string]: FilterState;
    };
    fns?: {
        [index: string]: FilterState;
    };
    defaultState?: FilterState;
}
export declare enum FilterState {
    Hidden = 0,
    Visible = 1,
    Disabled = 2
}
export declare enum BlockLayout {
    None = 0,
    Align = 1,
    Clean = 3,
    Flow = 4
}
export type EditorType = 'blocks' | 'ts';
export type EditorEvent = CreateEvent | UIEvent;
export interface CreateEvent {
    type: 'create';
    blockId: string;
}
export interface UIEvent {
    type: 'ui';
    action: 'groupHelpClicked';
    data?: Record<string, string>;
}
export interface NativeHostMessage {
    name?: string;
    download?: string;
    save?: string;
    cmd?: string;
}
export interface ImportFileOptions {
    filename: string;
    parts: (string | ArrayBuffer)[];
}
export type LanguageRestriction = /* Standard */ '' | 'python-only' | 'javascript-only' | 'blocks-only' | 'no-blocks' | 'no-python' | 'no-javascript';
export interface ToolboxCategoryDefinition {
    /**
     * The display name for the category
     */
    name?: string;
    /**
     * The icon of this category
     */
    icon?: string;
    /**
     * The color of this category
     */
    color?: string;
    /**
     * The weight of the category relative to other categories in the toolbox
     */
    weight?: number;
    /**
     * Whether or not the category should be placed in the advanced category
     */
    advanced?: boolean;
    /**
     * Blocks to appear in the category. Specifying this field will override
     * all existing blocks in the category. The ordering of the blocks is
     * determined by the ordering of this array.
     */
    blocks?: ToolboxBlockDefinition[];
    /**
     * Ordering of category groups
     */
    groups?: string[];
}
export interface ToolboxBlockDefinition {
    /**
     * Internal id used to refer to this block or snippet, must be unique
     */
    name: string;
    /**
     * Group label used to categorize block.  Blocks are arranged with other
     * blocks that share the same group.
     */
    group?: string;
    /**
     * Indicates an advanced API. Advanced APIs appear after basic ones in the
     * toolbox
     */
    advanced?: boolean;
    /**
     * The weight for the block. Blocks are arranged in order of they appear in the category
     * definition's array but the weight can be specified in the case that other APIs are
     * dynamically added to the category (eg. loops.forever())
     */
    weight?: number;
    /**
     * Description of code to appear in the hover text
     */
    jsDoc?: string;
    /**
     * TypeScript snippet of code to insert when dragged into editor
     */
    snippet?: string;
    /**
     * Python snippet of code to insert when dragged into editor
     */
    pySnippet?: string;
    /**
     * TypeScript name used for highlighting the snippet, uses name if not defined
     */
    snippetName?: string;
    /**
     * Python name used for highlighting the snippet, uses name if not defined
     */
    pySnippetName?: string;
    /**
     * Display just the snippet and nothing else. Should be set to true for
     * language constructs (eg. for-loops) and to false for function
     * calls (eg. Math.random())
     */
    snippetOnly?: boolean;
    /**
     * The return type of the block. This is used to determine the shape of the block rendered.
     */
    retType?: string;
    /**
     * The block definition in XML for the blockly toolbox.
     */
    blockXml?: string;
    /**
     * The Blockly block id used to identify this block.
     */
    blockId?: string;
}
export type CloudStatus = 'none' | 'synced' | 'justSynced' | 'offline' | 'syncing' | 'conflict' | 'localEdits';
export type CodeCardType = 'file' | 'example' | 'codeExample' | 'tutorial' | 'side' | 'template' | 'package' | 'hw' | 'forumUrl' | 'forumExample' | 'sharedExample' | 'link';
export type CodeCardEditorType = 'blocks' | 'js' | 'py';
export interface DependencyMap<T> {
    [index: string]: T;
}
export interface TargetVersions {
    target: string;
    targetId?: string;
    targetWebsite?: string;
    pxt?: string;
    tag?: string;
    branch?: string;
    commits?: string;
}
export interface CodeCardAction {
    url: string;
    editor?: CodeCardEditorType;
    cardType?: CodeCardType;
}
/**
 * The schema for the pxt.json package files
 */
export interface PackageConfig {
    name: string;
    version?: string;
    icon?: string;
    documentation?: string;
    targetVersions?: TargetVersions;
    description?: string;
    dependencies: DependencyMap<string>;
    license?: string;
    authors?: string[];
    files: string[];
    simFiles?: string[];
    testFiles?: string[];
    fileDependencies?: DependencyMap<string>;
    preferredEditor?: string;
    languageRestriction?: LanguageRestriction;
    testDependencies?: Record<string, string>;
    cppDependencies?: Record<string, string>;
    public?: boolean;
    partial?: boolean;
    binaryonly?: boolean;
    platformio?: {
        dependencies?: DependencyMap<string>;
    };
    compileServiceVariant?: string;
    palette?: string[];
    paletteNames?: string[];
    screenSize?: {
        width: number;
        height: number;
    };
    yotta?: YottaConfig;
    codal?: {
        libraries?: string[];
    };
    npmDependencies?: DependencyMap<string>;
    card?: CodeCard;
    additionalFilePath?: string;
    additionalFilePaths?: string[];
    core?: boolean;
    weight?: number;
    gistId?: string;
    extension?: PackageExtension;
    isExtension?: boolean;
    dalDTS?: {
        corePackage?: string;
        includeDirs?: string[];
        excludePrefix?: string[];
        compileServiceVariant?: string;
    };
    features?: string[];
    hidden?: boolean;
    searchOnly?: boolean;
    skipLocalization?: boolean;
    snippetBuilders?: SnippetConfig[];
    experimentalHw?: boolean;
    requiredCategories?: string[];
    supportedTargets?: string[];
    firmwareUrl?: string;
    disablesVariants?: string[];
    utf8?: boolean;
    disableTargetTemplateFiles?: boolean;
    theme?: string | Record<string, string>;
    assetPack?: boolean;
    assetPacks?: DependencyMap<boolean>;
}
export interface PackageExtension {
    namespace?: string;
    group?: string;
    label?: string;
    color?: string;
    advanced?: boolean;
    url?: string;
    localUrl?: string;
}
export interface YottaConfig {
    dependencies?: DependencyMap<string>;
    config?: any;
    /**
     * Overridable config flags
     */
    optionalConfig?: any;
    userConfigs?: {
        description: string;
        config: any;
    }[];
    configIsJustDefaults?: boolean;
    ignoreConflicts?: boolean;
}
export interface CodeCard {
    name?: string;
    shortName?: string;
    title?: string;
    role?: string;
    ariaLabel?: string;
    label?: string;
    labelIcon?: string;
    labelClass?: string;
    tags?: string[];
    tabIndex?: number;
    style?: string;
    color?: string;
    description?: string;
    extracontent?: string;
    blocksXml?: string;
    typeScript?: string;
    imageUrl?: string;
    largeImageUrl?: string;
    videoUrl?: string;
    youTubeId?: string;
    youTubePlaylistId?: string;
    buttonLabel?: string;
    actionIcon?: string;
    time?: number;
    url?: string;
    learnMoreUrl?: string;
    buyUrl?: string;
    feedbackUrl?: string;
    responsive?: boolean;
    cardType?: CodeCardType;
    editor?: CodeCardEditorType;
    otherActions?: CodeCardAction[];
    directOpen?: boolean;
    projectId?: string;
    header?: string;
    tutorialStep?: number;
    tutorialLength?: number;
    icon?: string;
    iconContent?: string;
    iconColor?: string;
    onClick?: (e: any) => void;
    onLabelClicked?: (e: any) => void;
    target?: string;
    className?: string;
    variant?: string;
}
export interface SnippetConfig {
    name: string;
    namespace: string;
    group?: string;
    label: string;
    outputType: 'blocks';
    outputBehavior?: /*assumed default*/ 'merge' | 'replace';
    initialOutput?: string;
    questions: SnippetQuestions[];
}
export type SnippetAnswerTypes = 'number' | 'text' | 'variableName' | 'dropdown' | 'spriteEditor' | 'yesno' | string;
export interface SnippetGoToOptions {
    question?: number;
    validate?: {
        regex?: {
            token: string;
            regex: string;
            match?: SnippetParameters;
            noMatch?: SnippetParameters;
        };
    };
    parameters?: SnippetParameters[];
}
export interface SnippetParameters {
    token?: string;
    answer?: string;
    question: number;
}
export type SnippetQuestionInput = {
    label?: string;
} & ({
    answerToken: string;
    defaultAnswer: SnippetAnswerTypes;
} | {
    answerTokens: string[];
    defaultAnswers: SnippetAnswerTypes[];
}) & ({
    type: string;
} | {
    type: 'number' | 'positionPicker';
    max?: number;
    min?: number;
} | {
    type: 'dropdown';
    options: Record<string, string>;
} | {
    type: 'yesno';
});
export interface SnippetQuestions {
    title: string;
    output?: string;
    outputConditionalOnAnswer?: string;
    errorMessage?: string;
    goto?: SnippetGoToOptions;
    inputs: SnippetQuestionInput[];
    hint?: string;
}
export interface TutorialOptions {
    tutorial?: string;
    tutorialName?: string;
    tutorialReportId?: string;
    tutorialStepInfo?: TutorialStepInfo[];
    tutorialActivityInfo?: TutorialActivityInfo[];
    tutorialStep?: number;
    tutorialReady?: boolean;
    tutorialHintCounter?: number;
    tutorialStepExpanded?: boolean;
    tutorialMd?: string;
    tutorialCode?: string[];
    tutorialRecipe?: boolean;
    templateCode?: string;
    mergeHeaderId?: string;
    mergeCarryoverCode?: boolean;
    autoexpandStep?: boolean;
    metadata?: TutorialMetadata;
    language?: string;
    assetFiles?: Record<string, string>;
    jres?: string;
    customTs?: string;
    templateLoaded?: boolean;
    globalBlockConfig?: TutorialBlockConfig;
    globalValidationConfig?: CodeValidationConfig;
    simTheme?: Partial<PackageConfig>;
}
export interface TutorialStepInfo {
    showHint?: boolean;
    showDialog?: boolean;
    resetDiff?: boolean;
    tutorialCompleted?: boolean;
    title?: string;
    activity?: number;
    contentMd?: string;
    headerContentMd?: string;
    hintContentMd?: string;
    localBlockConfig?: TutorialBlockConfig;
    localValidationConfig?: CodeValidationConfig;
}
export interface TutorialBlockConfig {
    md?: string;
    blocks?: {
        blockId?: string;
        xml?: string;
    }[];
}
export interface TutorialMetadata {
    activities?: boolean;
    explicitHints?: boolean;
    flyoutOnly?: boolean;
    hideIteration?: boolean;
    diffs?: boolean;
    noDiffs?: boolean;
    codeStart?: string;
    codeStop?: string;
    autoexpandOff?: boolean;
    preferredEditor?: string;
}
export interface TutorialActivityInfo {
    name: string;
    step: number;
}
export interface CodeValidationConfig {
    validatorsMetadata: {
        validatorType: string;
        properties: {
            enabled?: string;
            markers?: string;
        };
    }[];
}
