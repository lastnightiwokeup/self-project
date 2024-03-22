import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as budgetItemApi from "../api/budgetItem"

import moment from "moment-timezone";

const initialState = {
  //   vCardUserTable: {
  //     isLoading: true,
  //     rows: [],
  //     totalCount: 0,
  //   },
  //   generateVCard: null,
  //   generateUUID: null,
  //   vCardUUID: "",
  //   businessCards: [],
  //   requestRecordTime: null,
};

// export const search = createAsyncThunk("vCards/search", async (payload) => {
//   const response = await vCardsApi.search(payload);
//   return {
//     rows: response.data.data.rows.map((vCarduserRecord, index) => {
//       return {
//         id: vCarduserRecord.uuid,
//         netId: vCarduserRecord.netId,
//         modifiedBy: vCarduserRecord.modifiedBy,
//         index: index,
//         prefix: vCarduserRecord.prefix,
//         firstName: vCarduserRecord.firstName,
//         lastName: vCarduserRecord.lastName,
//         fullName: vCarduserRecord.fullName,
//         title: vCarduserRecord.title,
//         organization: vCarduserRecord.organization,
//         deptAbbr: vCarduserRecord.deptAbbr,
//         workPhone: vCarduserRecord.workPhone,
//         mobilePhone: vCarduserRecord.mobilePhone,
//         fax: vCarduserRecord.fax,
//         email: vCarduserRecord.email,
//         website: vCarduserRecord.website,
//         addressLine1: vCarduserRecord.addressLine1,
//         addressLine2: vCarduserRecord.addressLine2,
//         ORCID: vCarduserRecord.ORCID,
//         createdAt: new Date(vCarduserRecord.createdAt).toLocaleString(),
//         updatedAt: new Date(vCarduserRecord.updatedAt).toLocaleString(),
//         requestedAt:
//           vCarduserRecord.requestedAt && vCarduserRecord.requestedAt.length > 0
//             ? moment(
//                 vCarduserRecord.requestedAt
//                   .map((request) => request.requestedAt)
//                   //Retrieve the first element [0] (latest requested time) from the sorted array
//                   .sort((a, b) => moment(b) - moment(a))[0]
//               )
//                 .tz("Asia/Hong_Kong")
//                 .format("DD/MM/YYYY HH:mm:ss A")
//                 .toLocaleString()
//             : "",
//         businessCards: vCarduserRecord.businessCards,
//       };
//     }),
//     totalCount: response.data.data.totalCount,
//   };
// });

// export const getVCard = createAsyncThunk("vCards/getVCard", async (payload) => {
//   try {
//     const vCardRes = await vCardsApi.get(payload.uuid);
//     return vCardRes.data;
//   } catch (error) {
//     throw error;
//   }
// });

export const createBudgetItem = createAsyncThunk(
  "budgetItem/createBudgetItem",
  async (payload) => {
    try {
        console.log(payload)
      const itemRes = await budgetItemApi.create(payload);
      console.log(itemRes)
      return itemRes.data;

      //   return { message: vCardRes.data.message };
    } catch (error) {
      throw error;
    }
  }
);

// export const modifyVCard = createAsyncThunk(
//   "vCards/modifyVCard",
//   async (payload) => {
//     try {
//       const vCardRes = await vCardsApi.modify(payload);
//       return { message: vCardRes.data.message };
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const deleteVCardRecords = createAsyncThunk(
//   "vcards/deleteVCardRecords",
//   async (payload) => {
//     const vCardRes = await vCardsApi.unregister({ uuid: payload.uuid });

//     return { message: vCardRes.data.message };
//   }
// );

export const BudgetItemSlice = createSlice({
  name: "budgetItem",
  initialState,
  reducers: {
    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(search.pending, (state, action) => {
    //     state.vCardUserTable.isLoading = true;
    //   })
    //   .addCase(search.fulfilled, (state, action) => {
    //     state.vCardUserTable.isLoading = false;
    //     state.vCardUserTable.rows = action?.payload?.rows
    //       ?.sort((a, b) => {
    //         return moment(a.createdAt).valueOf() > moment(b.createdAt).valueOf()
    //           ? 1
    //           : -1;
    //       })
    //       ?.map((row, index) => {
    //         row.index = index + 1;
    //         row.createdAt = moment(row.createdAt)
    //           .tz("Asia/Hong_Kong")
    //           .format("YYYY-MM-DD HH:mm:ss");
    //         return row;
    //       });
    //     state.vCardUserTable.totalCount = action?.payload?.totalCount;
    //   })
    //   .addCase(search.rejected, (state, action) => {
    //     state.vCardUserTable.isLoading = false;
    //     state.vCardUserTable.rows = [];
    //     state.vCardUserTable.totalCount = 0;
    //   })
    //   .addCase(getVCard.fulfilled, (state, action) => {
    //     state.generateVCard = action?.payload?.data?.vCard;
    //     state.generateUUID = action?.payload?.data?.uuid;
    //   });
  },
});

export default BudgetItemSlice;
