import { sequelize } from '../server/database'
import { DataTypes, Model, Optional } from 'sequelize';

interface BudgetItemAttributes {
    id?: number;
    itemName: string;
    amount: number;
    category: string;
    date: string;
};

class BudgetItem extends Model<BudgetItemAttributes> implements BudgetItemAttributes {
    id?: number;
    itemName: string;
    amount: number;
    category: string;
    date: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

BudgetItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'budgetitem',
    }
);

export { BudgetItem, BudgetItemAttributes };