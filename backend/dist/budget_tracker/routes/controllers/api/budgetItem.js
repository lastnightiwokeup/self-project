"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = require("../../../../models/model");
const error_1 = require("../../../../models/error");
const BudgetItemService = __importStar(require("../../../../services/budgetItem"));
const pagination_1 = require("../../../../utilities/pagination");
require("moment-timezone");
const router = express_1.default.Router();
router.post('/search', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationParam = (0, pagination_1.parsePaginationRequest)(req.body);
        const id = parseIntInput(req.body.id);
        const itemName = parseStringInput(req.body.itemName);
        const amount = parseIntInput(req.body.amount);
        const date = parseStringInput(req.body.date);
        const category = parseStringInput(req.body.category);
        const budgetItem = yield BudgetItemService.searchPaginated({ id, itemName, amount, date, category }, paginationParam);
        return res.status(200).send((0, model_1.createApiResponse)('', budgetItem));
    }
    catch (err) {
        return next(err);
    }
}));
router.post('/create', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseIntInput(req.body.id);
        const itemName = parseStringInput(req.body.itemName);
        const amount = parseIntInput(req.body.amount);
        const category = parseStringInput(req.body.category);
        const date = parseStringInput(req.body.date);
        if (!amount) {
            return next(new error_1.ApiError('Missing amount'));
        }
        if (!itemName) {
            return next(new error_1.ApiError('Missing itemName'));
        }
        if (!category) {
            return next(new error_1.ApiError('Missing category'));
        }
        const itemRes = yield BudgetItemService.create(id, itemName, amount, category, date);
        return res.status(200).send((0, model_1.createApiResponse)('Record created successfully.', {
            date: itemRes.date,
            itemName: itemRes.itemName,
            amount: itemRes.amount,
            category: itemRes.category,
        }));
    }
    catch (err) {
        return next(err);
    }
}));
router.post('/edit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseIntInput(req.body.id);
        const itemName = parseStringInput(req.body.itemName);
        const amount = parseIntInput(req.body.amount);
        const category = parseStringInput(req.body.category);
        const date = parseStringInput(req.body.date);
        if (!amount) {
            return next(new error_1.ApiError('Missing amount'));
        }
        if (!itemName) {
            return next(new error_1.ApiError('Missing itemName'));
        }
        if (!category) {
            return next(new error_1.ApiError('Missing category'));
        }
        const itemRes = yield BudgetItemService.edit(id, itemName, amount, category, date);
        return res.status(200).send((0, model_1.createApiResponse)('Record modified successfully.', {
            date: itemRes.date,
            itemName: itemRes.itemName,
            amount: itemRes.amount,
            category: itemRes.category,
        }));
    }
    catch (err) {
        return next(err);
    }
}));
router.post('/deleteItem', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseIntInput(req.body.id);
        yield BudgetItemService.deleteItem(id);
        return res.status(200).send((0, model_1.createApiResponse)('Item deleted successfully.', null));
    }
    catch (err) {
        return next(err);
    }
}));
function parseStringInput(input) {
    if (!input) {
        return ''; // Return an empty string instead of null
    }
    return String(input);
}
function parseIntInput(input) {
    if (!input) {
        return NaN;
    }
    return parseInt(input, 10);
}
// function parseStringOrStringArrayInput(input: any): string[] | string {
//   if (!input) {
//     return null;
//   }
//   const output: string[] | string = Array.isArray(input) ?
//     input.map((item: any) => { return String(item) }) :
//     String(input);
//   return output;
// }
exports.default = router;
//# sourceMappingURL=budgetItem.js.map