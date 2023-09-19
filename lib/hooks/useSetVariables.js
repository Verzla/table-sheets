"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetVariables = void 0;
const react_1 = require("react");
// All the options will be prefixed with `tsGrid`
// Example: var(--tsGrid-headerBg);
const variableStylePrefix = 'tsGrid-';
const DEFAULT_PRIMARY = '#926AA6';
const DEFAULT_STYLE_OPTIONS = {
    primary: DEFAULT_PRIMARY,
    headerBg: '#EDE7FB',
    headerFontColor: DEFAULT_PRIMARY,
    border: '#E9E9E9',
    selectedBg: '#F8F5FF',
};
const useSetVariables = (ref, options) => {
    const opts = Object.assign(Object.assign({}, DEFAULT_STYLE_OPTIONS), options);
    // TODO Support SSR by using a isomorphic layout effect hook.
    (0, react_1.useLayoutEffect)(() => {
        if (ref && ref.current) {
            Object.keys(opts).map((o) => {
                var _a;
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.style.setProperty(`--${variableStylePrefix}${o}`, opts[o]);
            });
        }
    }, [ref, opts]);
};
exports.useSetVariables = useSetVariables;
