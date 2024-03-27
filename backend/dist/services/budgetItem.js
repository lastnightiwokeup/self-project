"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.deleteItem = exports.create = exports.searchPaginated = exports.search = void 0;
const sequelize_1 = require("sequelize");
const budgetItem_1 = require("../repo/budgetItem");
function search(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield searchPaginated(filter, {})).rows;
    });
}
exports.search = search;
function searchPaginated(filter, paginationParam) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchFilters = [];
            if (!!filter.itemName) {
                searchFilters.push({
                    [sequelize_1.Op.or]: [
                        { '$budgetItem.itemName$': { [sequelize_1.Op.like]: `%${filter.itemName}%` } },
                    ]
                });
            }
            const budgetItems = yield budgetItem_1.BudgetItem.findAndCountAll(Object.assign({ where: {
                    [sequelize_1.Op.and]: searchFilters,
                } }, paginationParam));
            return {
                rows: budgetItems.rows.map((items => {
                    return {
                        id: items.id,
                        itemName: items.itemName,
                        amount: items.amount,
                        date: items.date,
                        category: items.category,
                    };
                })),
                totalCount: budgetItems.count
            };
        }
        catch (error) {
            console.error("searchPaginated:", error);
            throw error;
        }
    });
}
exports.searchPaginated = searchPaginated;
function create(id, itemName, amount, category, date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itemRes = yield budgetItem_1.BudgetItem.create({ id, itemName, amount, category, date });
            console.log(itemRes);
            return itemRes;
        }
        catch (error) {
            console.error('Error in database interaction:', error);
            throw error;
        }
    });
}
exports.create = create;
function deleteItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield budgetItem_1.BudgetItem.destroy({
                where: { id: id },
            });
        }
        catch (error) {
            console.error("Error during item deletion:", error);
            throw new Error("Failed to delete item due to an unexpected error");
        }
    });
}
exports.deleteItem = deleteItem;
function edit(id, itemName, amount, category, date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingItem = yield budgetItem_1.BudgetItem.findByPk(id);
            if (!existingItem) {
                throw new Error('No item found with the provided id');
            }
            yield existingItem.update({
                itemName,
                amount,
                category,
                date,
            });
            yield existingItem.save();
            return [existingItem];
        }
        catch (error) {
            console.error('Error modifying item:', error);
            throw error;
        }
    });
}
exports.edit = edit;
//# sourceMappingURL=budgetItem.js.map