"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiResponse = void 0;
;
function createApiResponse(message, data) {
    return {
        success: true,
        message,
        data
    };
}
exports.createApiResponse = createApiResponse;
//# sourceMappingURL=model.js.map