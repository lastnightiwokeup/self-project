
import { Op, WhereAttributeHash, WhereOptions } from 'sequelize';
import { BudgetItemSummary } from '../models/model';
import { BudgetItem, BudgetItemAttributes } from '../repo/budgetItem';
import { PaginationParam, PaginationResult } from '../utilities/pagination';

interface SearchFilter {
    id:number,
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
                [Op.and]:
                    [searchFilters],
            } as WhereAttributeHash,
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
        id:number,
        itemName: string,
        amount: number,
        category: string,
        date: string,
    ): Promise<any> {
        try {
            const itemRes: BudgetItemAttributes = await BudgetItem.create({id, itemName, amount, category, date });
            console.log(itemRes)
            return itemRes;

        } catch (error) {
            console.error('Error in database interaction:', error);
            throw error;
        }
    }

    // async function modify(
    //     doer: MeSummary,
    //     uuid?: string,
    //     vCard?: string,
    //     bytes?: number,
    //     netId?: string,
    //     prefix?: string,
    //     firstName?: string,
    //     lastName?: string,
    //     title?: string,
    //     organization?: string,
    //     deptAbbr?: string,
    //     workPhone?: string,
    //     mobilePhone?: string,
    //     fax?: string,
    //     email?: string,
    //     website?: string,
    //     addressLine1?: string,
    //     addressLine2?: string,
    //     ORCID?: string,
    //     modifiedBy?: string
    // ): Promise<any> {
    //     try {
    //         const existingVCard = await VCards.findByPk(uuid);
    //         if (!existingVCard) {
    //             throw new Error(`VCardUser with ID ${uuid} not found.`);
    //         }

    //         const existingVCardUser = await VCardUser.findByPk(uuid);
    //         if (!existingVCardUser) { 
    //             throw new Error(`VCardUser with ID ${uuid} not found.`);
    //         }

    //         await existingVCardUser.update({
    //             modifiedBy: doer.netId,
    //             prefix,
    //             firstName,
    //             lastName,
    //             title,
    //             organization,
    //             deptAbbr,
    //             workPhone,
    //             mobilePhone,
    //             fax,
    //             email,
    //             website,
    //             addressLine1,
    //             addressLine2,
    //             ORCID,
    //         });

    //         await existingVCard.update({
    //             vCard, 
    //             bytes
    //         });

    //         await existingVCardUser.save();
    //         await existingVCard.save();

    //         return [existingVCard, existingVCardUser] ;
    //     } catch (error) {
    //         console.error('Error modifying VCard:', error);
    //         throw error;
    //     }
    // }

    // async function unregister(doer: MeSummary, uuid?: string): Promise<void> {
    //     try {
    //         const vCards = await VCards.findOne({ where: { uuid } });

    //         if (!vCards) {
    //             throw new Error("VCards not found for the provided UUID");
    //         }

    //         const vCardUser = await VCardUser.findOne({ where: { uuid } });

    //         if (!vCardUser) {
    //             throw new Error("VCardUser not found for the provided UUID");
    //         }

    //         await vCards.destroy();
    //         await vCardUser.destroy();
    //     } catch (error) {
    //         console.error("Error during unregister:", error);
    //         throw new Error("Failed to unregister due to an unexpected error");
    //     }
    // }


    export { search, searchPaginated, create}
// export { assign, unregister, modify, search, searchPaginated }




// export { search, searchPaginated }

