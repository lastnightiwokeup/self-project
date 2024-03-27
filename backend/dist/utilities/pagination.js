"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaginationRequest = void 0;
const DEFAULT_PAGE_SIZE = 30;
function parsePaginationRequest(req) {
    if (Number.isInteger(req === null || req === void 0 ? void 0 : req.pageSize)) {
        if ((req === null || req === void 0 ? void 0 : req.pageSize) === -1) {
            return {};
        }
        else if (Number.isInteger(req === null || req === void 0 ? void 0 : req.pageNum) && req.pageNum >= 0) {
            return {
                offset: req.pageSize * req.pageNum,
                limit: req.pageSize,
            };
        }
        else {
            return {
                offset: 0,
                limit: req.pageSize,
            };
        }
    }
    else {
        return {
            offset: 0,
            limit: 50,
        };
    }
}
exports.parsePaginationRequest = parsePaginationRequest;
;
//# sourceMappingURL=pagination.js.map