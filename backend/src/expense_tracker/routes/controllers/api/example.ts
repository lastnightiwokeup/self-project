import express, { NextFunction, Request, Response } from 'express';
import { requireRole } from '../../middlewares/authn';
import { createApiResponse, RoleLabel, RoleUserSummary, VCardUserSummary } from '../../../../models/model';
import { ApiError } from '../../../../models/error';
import * as VCardUserService from '../../../../services/vcarduser';
import { parsePaginationRequest, PaginationResult } from '../../../../utilities/pagination';

const router = express.Router();

router.post('/search', requireRole([RoleLabel.SystemAdmin, RoleLabel.VCardUser, RoleLabel.DepartmentAdmin]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paginationParam = parsePaginationRequest(req.body);
      const prefix: string = parseStringInput(req.body.prefix);
      const firstName: string = parseStringInput(req.body.firstName);
      const requestedAt: string | string[] = parseStringOrStringArrayInput(req.body.requestedAt);
      const lastName: string = parseStringInput(req.body.lastName);
      const fullName: string = parseStringInput(req.body.fullName);
      const createdAt: string = parseStringInput(req.body.createdAt);
      const updatedAt: string = parseStringInput(req.body.updatedAt);
      const title: string = parseStringInput(req.body.title);
      const organization: string = parseStringInput(req.body.organization);
      const deptAbbr: string = parseStringInput(req.body.deptAbbr);
      const workPhone: string = parseStringInput(req.body.workPhone);
      const mobilePhone: string = parseStringInput(req.body.mobilePhone);
      const fax: string = parseStringInput(req.body.fax);
      const email: string = parseStringInput(req.body.email);
      const website: string = parseStringInput(req.body.website);
      const addressLine1: string = parseStringInput(req.body.addressLine1);
      const addressLine2: string = parseStringInput(req.body.addressLine2);
      const ORCID: string = parseStringInput(req.body.ORCID);
      const netId: string = parseStringInput(req.body.netId);
      const modifiedBy: string = parseStringInput(req.body.modifiedBy);
      const businessCards: string | string[] = parseStringOrStringArrayInput(req.body.businessCard);

      const vCardUserAssignment = await VCardUserService.searchPaginated(req.session.data.me, { netId, requestedAt, modifiedBy, prefix, firstName, lastName, fullName, createdAt, updatedAt, title, organization, deptAbbr, workPhone, mobilePhone, fax, email, website, addressLine1, addressLine2, ORCID, businessCards }, paginationParam);
      return res.status(200).send(createApiResponse<PaginationResult<VCardUserSummary[]>>(null, vCardUserAssignment));
    } catch (err) {
      return next(err);
    }
  });

function parseStringInput(input: any): string {
  if (!input) {
    return null;
  }

  return String(input);
}


function parseIntInput(input: any): number {
  if (!input) {
    return NaN;
  }

  return parseInt(input, 10);
}

function parseStringOrStringArrayInput(input: any): string[] | string {
  if (!input) {
    return null;
  }

  const output: string[] | string = Array.isArray(input) ?
    input.map((item: any) => { return String(item) }) :
    String(input);

  return output;
}

function parseEventId(eventIdInput: any): number {
  if (!eventIdInput) {
    return null;
  }

  let eventId: number = null;

  try {
    eventId = Number.parseInt(String(eventIdInput), 10);
  }
  catch (err) {
    throw new ApiError('Invalid Event ID');
  }

  return eventId;
}

export default router;