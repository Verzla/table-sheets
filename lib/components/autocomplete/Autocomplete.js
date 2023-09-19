"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autocomplete = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Autocomplete_module_css_1 = __importDefault(require("./Autocomplete.module.css"));
const Input_1 = require("../input/Input");
const usehooks_ts_1 = require("usehooks-ts");
function Autocomplete({ name, data, value: selectedDataValue, onChange, ...props }) {
    const [search, setSearch] = (0, react_1.useState)(selectedDataValue?.content ?? '');
    const [itemFocused, setItemFocused] = (0, react_1.useState)(-1);
    const [focused, setFocused] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const inputRef = (0, react_1.useRef)(null);
    // Pretty bad search, but it works for now, consider adding some fuzzy search later
    const availableOptions = (0, react_1.useMemo)(() => {
        if (search.length > 0) {
            setItemFocused(0);
            return data.filter((d) => JSON.stringify(d).toLowerCase().includes(search.toLowerCase()));
        }
        else {
            setItemFocused(-1);
            return data;
        }
    }, [search, data]);
    const updateOnChange = (newValue) => {
        setFocused(false);
        setItemFocused(-1);
        setSearch(newValue.content);
        onChange(newValue);
    };
    (0, usehooks_ts_1.useOnClickOutside)(ref, () => {
        setTimeout(() => {
            setFocused(false);
        }, 1);
    });
    const autoCompleteKeyDown = (0, react_1.useCallback)((e) => {
        switch (e.key) {
            case ' ':
                {
                    setFocused(true);
                    // Do not add the space just open the auto complete menu
                    if (inputRef.current.value.length === 0) {
                        e.preventDefault();
                        return;
                    }
                }
                break;
            case 'ArrowUp':
                {
                    if (focused) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        setItemFocused(Math.max(-1, itemFocused - 1));
                    }
                }
                break;
            case 'ArrowDown':
                {
                    if (focused) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        setItemFocused(Math.min(data.length, itemFocused + 1));
                    }
                }
                break;
            case 'Escape':
                {
                    setItemFocused(-1);
                    setFocused(false);
                }
                break;
            case 'Tab':
            case 'Enter':
                {
                    // If we're focused we just select the item, otherwise we have to remove the selection from the main gridstate
                    if (focused && availableOptions.length > 0) {
                        e.preventDefault();
                        updateOnChange(availableOptions[itemFocused]);
                    }
                }
                break;
            case 'Shift':
            case 'Backspace':
                {
                    // Just don't "setFocused(true)";
                }
                break;
            default: {
                setFocused(true);
                break;
            }
        }
    }, [availableOptions, focused, itemFocused, inputRef]);
    (0, usehooks_ts_1.useEventListener)('keydown', (e) => autoCompleteKeyDown(e), inputRef);
    return ((0, jsx_runtime_1.jsxs)("div", { className: Autocomplete_module_css_1.default.autocomplete, ref: ref, children: [(0, jsx_runtime_1.jsx)(Input_1.Input, { ...props, value: search, onChange: (e) => setSearch(e.target.value), onDoubleClickCapture: () => setFocused(true), onBlur: () => {
                    setTimeout(() => {
                        setFocused(false);
                    }, 1);
                }, ref: inputRef }), focused && ((0, jsx_runtime_1.jsx)("div", { className: Autocomplete_module_css_1.default.autocompleteItems, children: availableOptions.map((d, dIndex) => ((0, jsx_runtime_1.jsx)("div", { className: dIndex === itemFocused ? Autocomplete_module_css_1.default.autocompleteActive : '', onClick: () => {
                        // TODO the onClick is not working
                        console.log('onClick', d);
                        updateOnChange(d);
                    }, children: d.content }, `ac_${name}_${d.id}`))) }))] }));
}
exports.Autocomplete = Autocomplete;