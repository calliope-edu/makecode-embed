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
export var FilterState;
(function (FilterState) {
    FilterState[FilterState["Hidden"] = 0] = "Hidden";
    FilterState[FilterState["Visible"] = 1] = "Visible";
    FilterState[FilterState["Disabled"] = 2] = "Disabled";
})(FilterState || (FilterState = {}));
export var BlockLayout;
(function (BlockLayout) {
    BlockLayout[BlockLayout["None"] = 0] = "None";
    BlockLayout[BlockLayout["Align"] = 1] = "Align";
    // Shuffle deprecated
    BlockLayout[BlockLayout["Clean"] = 3] = "Clean";
    BlockLayout[BlockLayout["Flow"] = 4] = "Flow";
})(BlockLayout || (BlockLayout = {}));
//# sourceMappingURL=pxt.js.map