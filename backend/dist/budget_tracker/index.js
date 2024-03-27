"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import '../src/repo'
const app_1 = __importDefault(require("./framework/app"));
const http_1 = __importDefault(require("./framework/http"));
(0, http_1.default)(app_1.default);
//# sourceMappingURL=index.js.map