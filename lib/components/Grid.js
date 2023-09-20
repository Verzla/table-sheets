"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const GridStyleFuncs_1 = require("./GridStyleFuncs");
const useSetVariables_1 = require("../hooks/useSetVariables");
const GridContext_1 = require("./GridContext");
const GridCell_1 = require("./GridCell");
const usehooks_ts_1 = require("usehooks-ts");
function Grid({ data, columns, styleVariables }) {
    const gridState = (0, GridContext_1.useGridState)(columns.length - 1, data.length - 1);
    const ref = (0, react_1.useRef)(null);
    const columnTemplate = (0, GridStyleFuncs_1.GetGridColumns)(columns.map((c) => { var _a; return (_a = c.width) !== null && _a !== void 0 ? _a : '1fr'; }));
    (0, useSetVariables_1.useSetVariables)(ref, styleVariables !== null && styleVariables !== void 0 ? styleVariables : {});
    (0, usehooks_ts_1.useOnClickOutside)(ref, () => {
        gridState.clearSelections();
    });
    (0, usehooks_ts_1.useEventListener)('keydown', (e) => {
        if (e.defaultPrevented) {
            return;
        }
        switch (e.key) {
            case 'Tab':
                {
                    if (e.shiftKey) {
                        gridState.move('x', -1);
                    }
                    else {
                        gridState.move('x', 1);
                    }
                }
                break;
            case 'ArrowRight':
                {
                    gridState.move('x', 1, e.shiftKey);
                }
                break;
            case 'ArrowLeft':
                {
                    gridState.move('x', -1, e.shiftKey);
                }
                break;
            case 'ArrowUp':
                {
                    gridState.move('y', -1, e.shiftKey);
                }
                break;
            case 'ArrowDown':
                {
                    gridState.move('y', 1, e.shiftKey);
                }
                break;
        }
    }, ref);
    return ((0, jsx_runtime_1.jsx)(GridContext_1.GridContext.Provider, { value: gridState, children: (0, jsx_runtime_1.jsxs)("div", { className: 'ts-grid', style: {
                gridTemplateRows: (0, GridStyleFuncs_1.GetGridRows)(data.length),
            }, ref: ref, children: [(0, jsx_runtime_1.jsx)("div", { className: 'ts-header', style: {
                        gridRow: 1,
                        gridTemplateColumns: columnTemplate,
                    }, children: columns.map((c, cIndex) => ((0, jsx_runtime_1.jsx)("div", { children: c.title(data[cIndex]) }, `gh_${cIndex}`))) }), data.map((d, dIndex) => ((0, jsx_runtime_1.jsx)("div", { className: 'ts-row', style: { gridRow: dIndex + 2, gridTemplateColumns: columnTemplate }, children: columns.map((c, cIndex) => ((0, jsx_runtime_1.jsx)(GridCell_1.GridCell, { readonly: c.readonly, cursor: [dIndex, cIndex], render: (state) => c.value(d, state) }, `gc_${cIndex}`))) }, `gr_${dIndex}`)))] }) }));
}
exports.Grid = Grid;
