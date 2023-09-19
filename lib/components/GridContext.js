"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGridContext = exports.GridContext = exports.useGridState = void 0;
const react_1 = require("react");
const Grid_module_css_1 = __importDefault(require("../style/Grid.module.css"));
const useGridState = (xMax, yMax) => {
    const [selections, setSelections] = (0, react_1.useState)([]);
    const [currentSelection, setCurrentSelection] = (0, react_1.useState)(null);
    const updateSelections = (0, react_1.useCallback)((e, { y, x }) => {
        if (e.metaKey || e.ctrlKey) {
            // Add to selections
            setCurrentSelection({ y, x });
            // Remove duplicates for faster searching in isSelected?
            // Or just yolo it, move fast.
            setSelections([...selections, { y, x }]);
        }
        else {
            setSelections([{ y, x }]);
            setCurrentSelection({ y, x });
        }
    }, [selections]);
    const moveFunction = (0, react_1.useCallback)((position, step, shiftKey = false) => {
        const newSelection = currentSelection !== null && currentSelection !== void 0 ? currentSelection : { x: 0, y: 0 };
        if (position == 'x') {
            const newX = Math.max(0, Math.min(newSelection.x + step, xMax));
            // Out of bounds.
            if (newX > xMax) {
                return;
            }
            console.log('newSelection.x', newX);
            newSelection.x = newX;
        }
        else {
            const newY = Math.max(0, Math.min(newSelection.y + step, yMax));
            // Out of bounds.
            if (newY > yMax) {
                return;
            }
            newSelection.y = newY;
        }
        // Check if the new selection is readonly or not
        if (document &&
            document.querySelector(`[data-x="${newSelection.x}"][data-y="${newSelection.y}"][data-readonly="true"]`)) {
            return;
        }
        setSelections(shiftKey ? [...selections, newSelection] : [newSelection]);
        setCurrentSelection(newSelection);
        // Focus the nearest input, would be fun to find a better way than selecting based on the CSS class
        setTimeout(() => {
            if (document) {
                const el = document.querySelector(`.${Grid_module_css_1.default.focus}`);
                const nearestInput = el === null || el === void 0 ? void 0 : el.querySelector('input');
                if (nearestInput) {
                    nearestInput.focus();
                }
                else if (el && 'activeElement' in document) {
                    // Remove the current focus if we cant find an input
                    document.activeElement.blur();
                }
            }
        }, 10);
    }, [selections]);
    return {
        selections: selections,
        currentSelection: currentSelection,
        select: updateSelections,
        move: moveFunction,
        clearSelections: () => {
            setSelections([]);
            setCurrentSelection(null);
        },
        getGridCellState: ({ x, y }) => {
            return {
                rowIndex: y,
                isSelected: selections.some((p) => p.y === y && p.x === x),
                isActive: currentSelection !== null &&
                    currentSelection.x === x &&
                    currentSelection.y === y,
            };
        },
    };
};
exports.useGridState = useGridState;
exports.GridContext = (0, react_1.createContext)({
    selections: [],
    currentSelection: null,
    move: () => { },
    select: () => { },
    getGridCellState: () => ({ isSelected: false, isActive: false, rowIndex: 0 }),
    clearSelections: () => { },
});
const useGridContext = () => (0, react_1.useContext)(exports.GridContext);
exports.useGridContext = useGridContext;
