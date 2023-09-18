"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGridRows = void 0;
var GetGridRows = function (dataLength, options) {
    if (options === void 0) { options = {
        headerHeight: 60,
        rowHeight: 50,
    }; }
    return "".concat(options.headerHeight, "px repeat(").concat(dataLength, ", ").concat(options.rowHeight, "px)");
};
exports.GetGridRows = GetGridRows;
