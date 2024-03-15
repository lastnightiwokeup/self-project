import express, { NextFunction, Request, Response } from 'express';
import { requireRole } from '../../middlewares/authn';
import { createApiResponse, RoleLabel, RoleUserSummary, VCardsSummary, VCardUserSummary } from '../../../../models/model';
import { VCardsAttributes } from '../../../../repo/vcards';
import { VCardUser } from '../../../../repo/vcarduser';
import * as VCardsService from '../../../../services/vcards';
import * as VCardUserService from '../../../../services/vcarduser';
const router = express.Router();


// router.get('/:uuid', requireRole([RoleLabel.SystemAdmin, RoleLabel.VCardUser, RoleLabel.DepartmentAdmin]),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const uuid: string = parseStringInput(req.params.uuid);
//       if (!uuid) { return next(new ApiError('Missing UUID')); }

//       const vCardRes: VCardsSummary[] = await VCardsService.search({ uuid });
//       const finalRes = vCardRes?.length > 0 ? vCardRes[0] : null;

//       return res.status(200).send(createApiResponse<VCardsSummary>(null, { uuid: finalRes?.uuid, vCard: finalRes?.vCard, bytes: finalRes?.bytes }));
//     } catch (err) {
//       return next(err);
//     }
//   }
// );

router.post('/assign', requireRole([RoleLabel.SystemAdmin, RoleLabel.VCardUser, RoleLabel.DepartmentAdmin]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const uuid: string = uuidv4();
      const bytes: number = parseIntInput(req.body.bytes);
      const prefix: string = parseStringInput(req.body.prefix);
      const firstName: string = parseStringInput(req.body.firstName);
      const lastName: string = parseStringInput(req.body.lastName);
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
      const modifiedBy: string = parseStringInput(req.body.modifiedBy);

      if (!firstName) { return next(new ApiError('Missing first name')); }
      if (!lastName) { return next(new ApiError('Missing last name')); }
      if (!title) { return next(new ApiError('Missing title')); }
      if (!organization) { return next(new ApiError('Missing organization')); }
      if (!workPhone) { return next(new ApiError('Missing workPhone')); }
      if (!email) { return next(new ApiError('Missing email')); }

      const vCard = vCardsJS();

      if (prefix) {
        vCard.namePrefix = prefix;
      }

      if (firstName) {
        vCard.firstName = firstName;
      }

      if (lastName) {
        vCard.lastName = lastName;
      }

      if (title) {
        vCard.title = title;
      }

      if (deptAbbr && organization) {
        vCard.organization = `${deptAbbr} \n${organization}`;
      } else if (deptAbbr) {
        vCard.organization = deptAbbr;
      } else if (organization) {
        vCard.organization = organization;
      }

      if (workPhone) {
        vCard.workPhone = workPhone;
      }

      if (mobilePhone) {
        vCard.cellPhone = mobilePhone;
      }

      if (fax) {
        vCard.workFax = fax;
      }

      if (website) {
        vCard.url = website;
      }

      if (addressLine1) {
        vCard.workAddress.city = addressLine1;
      }

      if (addressLine2) {
        vCard.workAddress.street = addressLine2;
      }

      const newVCardString = vCard.getFormattedString();

      const vcardArray = newVCardString?.split(/\r?\n/);
      let newVCard = "";
      let firstRevFound = false;

      for (let i = 0; i < vcardArray?.length; i++) {
        if (!firstRevFound && vcardArray[i].startsWith('REV:')) {
          firstRevFound = true;
          continue;
        }

        if (i === vcardArray?.length - 2) {
          if (email) {
            newVCard += "\nEMAIL;type=INTERNET;type=pref:" + email;
          }
          if (ORCID) {
            newVCard += "\nitem1.URL:" + ORCID;
            newVCard += "\nitem1.X-ABLabel:ORCID";
          }
          newVCard += "\nREV:" + (new Date()).toISOString();
        }

        newVCard += "\n" + vcardArray[i];
      }

      newVCard = newVCard.trim();

      function calculateByteCount(str: string): number {
        const byteCount = [...str].reduce((count, char) => {
          // check the Chinese characters in the vCard string,
          // count as 6 bytes if it is true
          const isChineseCharacter = /[\u4e00-\u9fa5]/.test(char);
          const charSize = isChineseCharacter ? 6 : 1;
      
          return count + charSize;
        }, 0);
      
        return byteCount;
      }
      
      // Calculate the byte count of the vCard string
      const vCardStringSize = calculateByteCount(newVCard);
      
      if (vCardStringSize > 770) {
        const errorMessage = `VCard size ${vCardStringSize} exceeds the maximum supported limit (770 bytes). Please shorten the input.`;
        return next(new ApiError(errorMessage));
      }

      const vCardRes = await VCardsService.assign(
        req.session.data.me,
        uuid,
        newVCard,
        vCardStringSize,
        prefix,
        firstName,
        lastName,
        title,
        organization,
        deptAbbr,
        workPhone,
        mobilePhone,
        fax,
        email,
        website,
        addressLine1,
        addressLine2,
        ORCID
      );
      return res.status(200).send(
        createApiResponse('VCard created successfully.', {
          uuid: uuid,
          vCard: newVCard,
          bytes: vCardStringSize,
          prefix: prefix,
          firstName: firstName,
          lastName: lastName,
          title: title,
          organization: organization,
          deptAbbr: deptAbbr,
          workPhone: workPhone,
          mobilePhone: mobilePhone,
          fax: fax,
          email: email,
          website: website,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          ORCID: ORCID
        })
      );
    } catch (err) {
      return next(err);
    }
  }
);

// router.post('/modify', requireRole([RoleLabel.SystemAdmin, RoleLabel.VCardUser, RoleLabel.DepartmentAdmin]), async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const uuid: string = parseStringInput(req.body.uuid);
//     if (!uuid) {
//       return next(new ApiError('Missing UUID'));
//     }

//     const modifiedBy: string = parseStringInput(req.body.modifiedBy);
//     const prefix: string = parseStringInput(req.body.prefix);
//     const firstName: string = parseStringInput(req.body.firstName);
//     const lastName: string = parseStringInput(req.body.lastName);
//     const title: string = parseStringInput(req.body.title);
//     const organization: string = parseStringInput(req.body.organization);
//     const deptAbbr: string = parseStringInput(req.body.deptAbbr);
//     const workPhone: string = parseStringInput(req.body.workPhone);
//     const mobilePhone: string = parseStringInput(req.body.mobilePhone);
//     const fax: string = parseStringInput(req.body.fax);
//     const email: string = parseStringInput(req.body.email);
//     const website: string = parseStringInput(req.body.website);
//     const addressLine1: string = parseStringInput(req.body.addressLine1);
//     const addressLine2: string = parseStringInput(req.body.addressLine2);
//     const ORCID: string = parseStringInput(req.body.ORCID);

//     if (!firstName) { return next(new ApiError('Missing first name')); }
//     if (!lastName) { return next(new ApiError('Missing last name')); }
//     if (!title) { return next(new ApiError('Missing title')); }
//     if (!organization) { return next(new ApiError('Missing organization')); }
//     if (!workPhone) { return next(new ApiError('Missing workPhone')); }
//     if (!email) { return next(new ApiError('Missing email')); }

//     const vCard = vCardsJS();

//     if (prefix) {
//       vCard.namePrefix = prefix;
//     }

//     if (firstName) {
//       vCard.firstName = firstName;
//     }

//     if (lastName) {
//       vCard.lastName = lastName;
//     }

//     if (title) {
//       vCard.title = title;
//     }

//     if (deptAbbr && organization) {
//       vCard.organization = `${deptAbbr} \n${organization}`;
//     } else if (deptAbbr) {
//       vCard.organization = deptAbbr;
//     } else if (organization) {
//       vCard.organization = organization;
//     }

//     if (workPhone) {
//       vCard.workPhone = workPhone;
//     }

//     if (mobilePhone) {
//       vCard.cellPhone = mobilePhone;
//     }

//     if (fax) {
//       vCard.workFax = fax;
//     }

//     if (website) {
//       vCard.url = website;
//     }

//     if (addressLine1) {
//       vCard.workAddress.city = addressLine1;
//     }

//     if (addressLine2) {
//       vCard.workAddress.street = addressLine2;
//     }

//     const newVCardString = vCard.getFormattedString();

//     const vcardArray = newVCardString?.split(/\r?\n/);
//     let newVCard = "";
//     let firstRevFound = false;

//     for (let i = 0; i < vcardArray?.length; i++) {
//       if (!firstRevFound && vcardArray[i].startsWith('REV:')) {
//         firstRevFound = true;
//         continue;
//       }

//       if (i === vcardArray?.length - 2) {
//         if (email) {
//           newVCard += "\nEMAIL;type=INTERNET;type=pref:" + email;
//         }
//         if (ORCID) {
//           newVCard += "\nitem1.URL:" + ORCID;
//           newVCard += "\nitem1.X-ABLabel:ORCID";
//         }
//         newVCard += "\nREV:" + (new Date()).toISOString();
//       }

//       newVCard += "\n" + vcardArray[i];
//     }

//     newVCard = newVCard.trim();

//     function calculateByteCount(str: string): number {
//       const byteCount = [...str].reduce((count, char) => {
//         const isChineseCharacter = /[\u4e00-\u9fa5]/.test(char);
//         const charSize = isChineseCharacter ? 6 : 1;
    
//         return count + charSize;
//       }, 0);
    
//       return byteCount;
//     }
    
//     const vCardStringSize = calculateByteCount(newVCard);
    
//     if (vCardStringSize > 770) {
//       const errorMessage = `VCard size ${vCardStringSize} exceeds the maximum supported limit (770 bytes). Please shorten the input.`;
//       return next(new ApiError(errorMessage));
//     }

//     const vCardRes = await VCardsService.modify(
//       req.session.data.me,
//       uuid,
//       newVCard,
//       vCardStringSize,
//       modifiedBy,
//       prefix,
//       firstName,
//       lastName,
//       title,
//       organization,
//       deptAbbr,
//       workPhone,
//       mobilePhone,
//       fax,
//       email,
//       website,
//       addressLine1,
//       addressLine2,
//       ORCID
//     );

//     return res.status(200).send
//       (createApiResponse('VCard modified successfully.', {
//         uuid: vCardRes?.uuid,
//         vCard: newVCard,
//         bytes: vCardStringSize,
//         modifiedBy: vCardRes.modifiedBy,
//         prefix: vCardRes.prefix,
//         firstName: vCardRes.firstName,
//         lastName: vCardRes.lastName,
//         title: vCardRes.title,
//         organization: vCardRes.organization,
//         deptAbbr: vCardRes.deptAbbr,
//         workPhone: vCardRes.workPhone,
//         mobilePhone: vCardRes.mobilePhone,
//         fax: vCardRes.fax,
//         email: vCardRes.email,
//         website: vCardRes.website,
//         addressLine1: vCardRes.addressLine1,
//         addressLine2: vCardRes.addressLine2,
//         ORCID: vCardRes.ORCID
//       }));
//   } catch (err) {
//     return next(err);
//   }
// });

// router.post('/unregister', requireRole([RoleLabel.SystemAdmin, RoleLabel.VCardUser, RoleLabel.DepartmentAdmin]), async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id: string = parseStringInput(req.body.uuid);

//     await VCardsService.unregister(req.session.data.me, id);

//     return res.status(200).send(createApiResponse('VCard deleted successfully.', null));
//   } catch (err) {
//     return next(err);
//   }
// });

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

