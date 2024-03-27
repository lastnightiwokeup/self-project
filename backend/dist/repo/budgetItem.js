"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetItem = void 0;
const database_1 = require("../server/database");
const sequelize_1 = require("sequelize");
;
class BudgetItem extends sequelize_1.Model {
}
exports.BudgetItem = BudgetItem;
BudgetItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    itemName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'budgetitem',
});
//# sourceMappingURL=budgetItem.js.map