
import { Op, WhereAttributeHash } from 'sequelize';
import { BudgetItemSummary } from '../models/model';
import { BudgetItem, BudgetItemAttributes } from '../repo/budgetItem';
// import { PaginationParam, PaginationResult } from '../utilities/pagination';

async function create(
    id:number,
    itemName: string,
    amount: number,
    category: string,
    date: Date,
): Promise<any> {
    try {
        const itemRes: BudgetItemAttributes = await BudgetItem.create({id, itemName, amount, category, date });

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

// interface SearchFilter {
//     uuid?: string,
//     vCard?: string,
//     bytes?: number

// }
// async function search(filter: SearchFilter): Promise<VCardsSummary[]> {
//     return (await searchPaginated(filter, {})).rows;
// }

// async function searchPaginated(filter: SearchFilter, paginationParam: NonNullable<PaginationParam>): Promise<PaginationResult<VCardsSummary[]>> {
//     try {
//         const vCards = await VCards.findAll({
//             where: {
//                 [Op.and]: [
//                     filter
//                 ]
//             } as WhereAttributeHash,
//             ...paginationParam,
//         });

//         return {
//             rows: vCards.map((vCardsAssignment => {
//                 return {
//                     uuid: vCardsAssignment.uuid,
//                     vCard: vCardsAssignment.vCard,
//                     bytes: vCardsAssignment.bytes
//                 };
//             })),
//             totalCount: vCards?.length
//         };
//     } catch (error) {
//         console.error("searchPaginated:", error);
//         throw error;
//     }
// }



export { create }
// export { assign, unregister, modify, search, searchPaginated }



// interface SearchFilter {
//     uuid?: string,
//     prefix?: string,
//     firstName?: string,
//     lastName?: string,
//     fullName?: string,
//     createdAt?: Date | string,
//     updatedAt?: Date | string,
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
//     netId?: string,
//     modifiedBy?: string,
//     requestedAt?: Date | string | (Date | string)[],
//     businessCards?: string[] | string,
// }

// async function search(doer: MeSummary, filter: SearchFilter): Promise<VCardUserSummary[]> {
//     return (await searchPaginated(doer, filter, {})).rows;
// }

// async function searchPaginated(doer: MeSummary, filter: SearchFilter, paginationParam: NonNullable<PaginationParam>): Promise<PaginationResult<VCardUserSummary[]>> {
//     try {
//         if (!hasAnyRole(doer, [RoleLabel.VCardUser, RoleLabel.SystemAdmin, RoleLabel.DepartmentAdmin])) {
//             throw apiUnauthorizedError;
//         }

//         const searchFilters: WhereOptions<VCardUserAttributes>[] = [];

//         if (!!filter.fullName) {
//             searchFilters.push({
//                 [Op.or]: [
//                     { '$vcarduser.fullName$': { [Op.like]: `%${filter.fullName}%` } },
//                 ]
//             });
//         }

//         const vCardUsers = await VCardUser.findAll({
//             where: {
//                 [Op.and]:
//                     [evalReadAcl(doer),
//                         searchFilters
//                     ],
//             } as WhereAttributeHash,
//             include: [
//                 {
//                     model: RequestEmail,
//                     as: 'requestedAt'
//                 },
//                 {
//                     model: BusinessCardSubmission,
//                     as: 'businessCards'
//                 },
//             ],
//             ...paginationParam,
//         });
//         return {
//             rows: vCardUsers.map((vCardUserAssignment => {
//                 return {
//                     uuid: vCardUserAssignment.uuid,
//                     prefix: vCardUserAssignment.prefix,
//                     firstName: vCardUserAssignment.firstName,
//                     lastName: vCardUserAssignment.lastName,
//                     fullName: vCardUserAssignment.fullName,
//                     title: vCardUserAssignment.title,
//                     organization: vCardUserAssignment.organization,
//                     deptAbbr: vCardUserAssignment.deptAbbr,
//                     workPhone: vCardUserAssignment.workPhone,
//                     mobilePhone: vCardUserAssignment.mobilePhone,
//                     fax: vCardUserAssignment.fax,
//                     email: vCardUserAssignment.email,
//                     website: vCardUserAssignment.website,
//                     addressLine1: vCardUserAssignment.addressLine1,
//                     addressLine2: vCardUserAssignment.addressLine2,
//                     ORCID: vCardUserAssignment.ORCID,
//                     createdAt: vCardUserAssignment.createdAt,
//                     updatedAt: vCardUserAssignment.updatedAt,
//                     netId: vCardUserAssignment.netId,
//                     modifiedBy: vCardUserAssignment.modifiedBy,
//                     requestedAt: vCardUserAssignment.requestedAt,
//                     businessCards: vCardUserAssignment?.businessCards?.map(cards => {
//                         const businessCard = cards?.businessCard;
//                         return businessCard ? businessCard.toString() : null;
//                     })
//                 };
//             })),
//             totalCount: vCardUsers?.length
//         };

//     } catch (error) {
//         console.error("searchPaginated:", error);
//         throw error;
//     }
// }
// function evalReadAcl(doer: MeSummary): OrOperator<RoleUserAttributes | VCardUserAttributes | BusinessCardSubmissionAttributes> {
//     if (doer === null) {
//         return { [Op.or]: literal('1=1') };
//     }

//     const aclFilters: WhereValue<RoleUserAttributes | VCardUserAttributes | BusinessCardSubmissionAttributes>[] = [];

//     const isSameDeptAbbr = doer.roles
//         .filter(role => role.roleLabel === RoleLabel.DepartmentAdmin)
//         .map(role => role.deptAbbr);

//     if (isSameDeptAbbr.length > 0) {
//         aclFilters.push({
//             [Op.or]: [
//                 {
//                     '$vcarduser.deptAbbr$': { [Op.in]: isSameDeptAbbr }
//                 },
//                 {
//                     '$vcarduser.netId$': { [Op.eq]: doer.netId },
//                 }
//             ]
//         } as WhereAttributeHash);
//     }


//     const isVCardUser = hasAnyRole(doer, [RoleLabel.VCardUser]);
//     const isSystemAdmin = hasAnyRole(doer, [RoleLabel.SystemAdmin]);

//     // Allow access to all records
//     if (isSystemAdmin) {
//         return { [Op.or]: literal('1=1') };
//     }

//     if (isVCardUser) {
//         aclFilters.push({
//             [Op.and]: [
//                 {
//                 '$vcarduser.netId$': { [Op.eq]: doer.netId }
//             }
//         ]
//         } as WhereAttributeHash);
//     }


//     if (aclFilters.length === 0) {
//         return { [Op.or]: literal('1=0') };
//     } else {
//         return { [Op.or]: aclFilters };
//     }
// }






// export { search, searchPaginated }

