"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiInternalServerError = exports.apiSessionTimeoutError = exports.ApiError = void 0;
class ApiError {
    constructor(message) {
        this.name = "ApiError";
        this.message = message;
    }
}
exports.ApiError = ApiError;
const apiSessionTimeoutError = new ApiError("Session Timeout.");
exports.apiSessionTimeoutError = apiSessionTimeoutError;
const apiInternalServerError = new ApiError("Internal Server Error.");
exports.apiInternalServerError = apiInternalServerError;
