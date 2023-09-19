"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Input_module_css_1 = __importDefault(require("./Input.module.css"));
exports.Input = (0, react_1.forwardRef)((props, ref) => ((0, jsx_runtime_1.jsx)("input", Object.assign({ className: Input_module_css_1.default.input }, props, { ref: ref }))));
