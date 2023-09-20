"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const GridContext_1 = require("./GridContext");
const GridCell = ({ render, readonly, cursor: [y, x], }) => {
    const { select, getGridCellState } = (0, GridContext_1.useGridContext)();
    const cellState = getGridCellState({ y, x });
    return ((0, jsx_runtime_1.jsx)("div", { className: 'ts-cell', "data-readonly": Boolean(readonly), "data-y": y, "data-x": x, children: (0, jsx_runtime_1.jsx)("div", { className: [
                cellState.isActive ? 'ts-cell-active' : '',
                cellState.isSelected ? 'ts-cell-focus' : '',
            ].join(' '), onClick: (e) => {
                if (!readonly) {
                    select(e.nativeEvent, { y, x });
                }
            }, children: render(cellState) }) }));
};
exports.GridCell = GridCell;
