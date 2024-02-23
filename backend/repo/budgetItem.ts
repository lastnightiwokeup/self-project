import { sequelize } from '../src/utilities/database.js';
import { DataTypes, Model, Optional } from 'sequelize';

interface BudgetItemAttributes {
    id: number;
    itemName: string;
    amount: number;
    category: string,
    date: Date,
};

class BudgetItem extends Model<BudgetItemAttributes> implements BudgetItemAttributes {
    id: number;
    itemName: string;
    amount: number;
    category: string;
    date: Date;

}

BudgetItem.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        itemName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'budgetitem',
    }
);

export { BudgetItem, BudgetItemAttributes };