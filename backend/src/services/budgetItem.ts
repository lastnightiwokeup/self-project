
import { Op, WhereAttributeHash, WhereOptions } from 'sequelize';
import { BudgetItemSummary } from '../models/model';
import { BudgetItem, BudgetItemAttributes } from '../repo/budgetItem';
import { PaginationParam, PaginationResult } from '../utilities/pagination';

interface SearchFilter {
    id: number,
    itemName: string,
    amount: number,
    category: string,
    date: string,
}

async function search(filter: SearchFilter): Promise<BudgetItemSummary[]> {
    return (await searchPaginated(filter, {})).rows;
}

async function searchPaginated(filter: SearchFilter, paginationParam: NonNullable<PaginationParam>): Promise<PaginationResult<BudgetItemSummary[]>> {
    try {

        const searchFilters: WhereOptions<BudgetItemAttributes>[] = [];

        if (!!filter.itemName) {
            searchFilters.push({
                [Op.or]: [
                    { '$budgetItem.itemName$': { [Op.like]: `%${filter.itemName}%` } },
                ]
            });
        }

        const budgetItems = await BudgetItem.findAndCountAll({
            where: {
                [Op.and]: searchFilters,
            },
            ...paginationParam,
        });
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

    } catch (error) {
        console.error("searchPaginated:", error);
        throw error;
    }
}

async function create(
    id: number,
    itemName: string,
    amount: number,
    category: string,
    date: string,
): Promise<any> {
    try {
        const itemRes: BudgetItemAttributes = await BudgetItem.create({ id, itemName, amount, category, date });
        console.log(itemRes)
        return itemRes;

    } catch (error) {
        console.error('Error in database interaction:', error);
        throw error;
    }
}

async function deleteItem(id?: number): Promise<void> {
    try {

        await BudgetItem.destroy({
            where: { id: id },
        });

    } catch (error) {
        console.error("Error during item deletion:", error);
        throw new Error("Failed to delete item due to an unexpected error");
    }
}

async function edit(
    id?: number,
    itemName?: string,
    amount?: number,
    category?: string,
    date?: string,
): Promise<any> {
    try {
        const existingItem = await BudgetItem.findByPk(id);

        if (!existingItem) {
            throw new Error('No item found with the provided id');
        }

        await existingItem.update({
            itemName,
            amount,
            category,
            date,

        });

        await existingItem.save();

        return [existingItem];
    } catch (error) {
        console.error('Error modifying item:', error);
        throw error;
    }
}


export { search, searchPaginated, create, deleteItem, edit }

