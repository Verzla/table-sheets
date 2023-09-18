"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGridRows = void 0;
const GetGridRows = (dataLength, options = {
    headerHeight: 60,
    rowHeight: 50,
}) => `${options.headerHeight}px repeat(${dataLength}, ${options.rowHeight}px)`;
exports.GetGridRows = GetGridRows;
