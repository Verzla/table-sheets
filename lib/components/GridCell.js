"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Grid_module_css_1 = __importDefault(require("../style/Grid.module.css"));
const GridContext_1 = require("./GridContext");
const GridCell = ({ render, readonly, cursor: [y, x], }) => {
    const { select, getGridCellState } = (0, GridContext_1.useGridContext)();
    const cellState = getGridCellState({ y, x });
    return ((0, jsx_runtime_1.jsx)("div", { className: Grid_module_css_1.default.cell, "data-readonly": Boolean(readonly), "data-y": y, "data-x": x, children: (0, jsx_runtime_1.jsx)("div", { className: [
                cellState.isActive ? Grid_module_css_1.default.active : '',
                cellState.isSelected ? Grid_module_css_1.default.focus : '',
            ].join(' '), onClick: (e) => {
                if (!readonly) {
                    select(e.nativeEvent, { y, x });
                }
            }, children: render(cellState) }) }));
};
exports.GridCell = GridCell;
