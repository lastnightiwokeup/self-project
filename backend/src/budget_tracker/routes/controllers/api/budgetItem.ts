import express, { NextFunction, Request, Response } from 'express';
import { createApiResponse, BudgetItemSummary } from '../../../../models/model';
import { ApiError } from '../../../../models/error';
import * as BudgetItemService from '../../../../services/budgetItem';
import { parsePaginationRequest, PaginationResult } from '../../../../utilities/pagination';
import moment from 'moment';
import 'moment-timezone';

const router = express.Router();

router.post('/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paginationParam = parsePaginationRequest(req.body);
    const id: number = parseIntInput(req.body.id);
    const itemName: string = parseStringInput(req.body.firstName);
    const amount: number = parseIntInput(req.body.amount);
    const date: string = parseStringInput(req.body.date);
    const category: string = parseStringInput(req.body.category);

    const budgetItem = await BudgetItemService.searchPaginated({ id, itemName, amount, date, category }, paginationParam);
    return res.status(200).send(createApiResponse<PaginationResult<BudgetItemSummary[]>>('', budgetItem));
  } catch (err) {
    return next(err);
  }
});

router.post('/create',
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const id: number = parseIntInput(req.body.id);
      const itemName: string = parseStringInput(req.body.itemName);
      const amount: number = parseIntInput(req.body.amount);
      const category: string = parseStringInput(req.body.category);
      const date: string = parseStringInput(req.body.date);


      if (!amount) { return next(new ApiError('Missing amount')); }
      if (!itemName) { return next(new ApiError('Missing itemName')); }
      if (!category) { return next(new ApiError('Missing category')); }

      const itemRes = await BudgetItemService.create(
        id,
        itemName,
        amount,
        category,
        date
      );
      console.log(itemRes)
      return res.status(200).send(
        createApiResponse('Item created successfully.', {
          itemName: itemRes.itemName,
          amount: itemRes.amount,
          category: itemRes.category,
        })
      );
    } catch (err) {
      return next(err);
    }
  }
);


function parseStringInput(input: any): string {
  if (!input) {
    return ''; // Return an empty string instead of null
  }

  return String(input);
}

function parseIntInput(input: any): number {
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


export default router;