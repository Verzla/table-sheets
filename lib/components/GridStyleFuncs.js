"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGridColumns = exports.GetGridRows = void 0;
const GetGridRows = (dataLength, options = {
    headerHeight: 34,
    rowHeight: 40,
}) => `${options.headerHeight}px repeat(${dataLength}, ${options.rowHeight}px)`;
exports.GetGridRows = GetGridRows;
const GetGridColumns = (columns) => columns.join(' ');
exports.GetGridColumns = GetGridColumns;
