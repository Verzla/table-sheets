"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetVariables = void 0;
var react_1 = require("react");
// All the options will be prefixed with `tsGrid`
// Example: var(--tsGrid-headerBg);
var variableStylePrefix = 'tsGrid-';
var DEFAULT_PRIMARY = '#926AA6';
var DEFAULT_STYLE_OPTIONS = {
    primary: DEFAULT_PRIMARY,
    headerBg: '#EDE7FB',
    headerFontColor: DEFAULT_PRIMARY,
    border: '#E9E9E9',
};
var useSetVariables = function (ref, options) {
    var opts = __assign(__assign({}, DEFAULT_STYLE_OPTIONS), options);
    // TODO Support SSR by using a isomorphic layout effect hook.
    (0, react_1.useLayoutEffect)(function () {
        if (ref && ref.current) {
            Object.keys(opts).map(function (o) {
                ref.current.style.setProperty("--".concat(variableStylePrefix).concat(o), opts[o]);
            });
        }
    }, [ref, opts]);
};
exports.useSetVariables = useSetVariables;
