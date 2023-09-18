"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Grid_module_css_1 = __importDefault(require("../style/Grid.module.css"));
var GridStyleFuncs_1 = require("./GridStyleFuncs");
var useSetVariables_1 = require("../hooks/useSetVariables");
function Grid(_a) {
    var data = _a.data, columns = _a.columns, styleVariables = _a.styleVariables, onChange = _a.onChange;
    var ref = (0, react_1.useRef)(null);
    (0, useSetVariables_1.useSetVariables)(ref, styleVariables);
    return ((0, jsx_runtime_1.jsxs)("div", { className: Grid_module_css_1.default.grid, style: { gridTemplateRows: (0, GridStyleFuncs_1.GetGridRows)(data.length) }, ref: ref, children: [(0, jsx_runtime_1.jsx)("div", { className: Grid_module_css_1.default.header, style: { gridRow: 1 }, children: columns.map(function (c, cIndex) { return ((0, jsx_runtime_1.jsx)("div", { children: c.title(data[cIndex]) }, "gh_".concat(cIndex))); }) }), data.map(function (d, dIndex) { return ((0, jsx_runtime_1.jsx)("div", { className: Grid_module_css_1.default.row, style: { gridRow: dIndex + 2 }, children: columns.map(function (c, cIndex) { return ((0, jsx_runtime_1.jsx)("div", { children: c.value(d) }, "gh_".concat(cIndex))); }) }, "gr_".concat(dIndex))); })] }));
}
exports.Grid = Grid;
