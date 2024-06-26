import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as budgetItemApi from "../api/budgetItem";

import moment from "moment-timezone";

const initialState = {
  budgetItemTable: {
    isLoading: true,
    rows: [],
    totalCount: 0,
  },
};

export const search = createAsyncThunk("budgetItem/search", async (payload) => {
  const response = await budgetItemApi.search(payload);
  return {
    rows: response.data.data.rows.map((budgetItemRecord, index) => {
      return {
        id: budgetItemRecord.id,
        itemName: budgetItemRecord.itemName,
        amount: budgetItemRecord.amount,
        index: index,
        date: budgetItemRecord.date,
        category: budgetItemRecord.category
      };
    }),
    totalCount: response.data.data.totalCount,
  };
});

// export const search = createAsyncThunk(
//   "budgetItem/search",
//   async (payload) => {
//     const response = await budgetItemApi.search(payload);
//     return response.data;
//   }
// );

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
      const itemRes = await budgetItemApi.create(payload);
      return itemRes.data;

        // return { message: itemRes.data.message };
    } catch (error) {
      throw error;
    }
  }
);

export const editBudgetItem = createAsyncThunk(
  "budgetItem/editBudgetItem",
  async (payload) => {
    try {
      const itemRes = await budgetItemApi.edit(payload);
      // return { message: vCardRes.data.message };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteItemRecord = createAsyncThunk(
  "budgetItem/deleteItemRecord",
  async (payload) => {

    const itemRes = await budgetItemApi.deleteItem(payload);

    // return { message: itemRes.data.message };
  }
);

export const BudgetItemSlice = createSlice({
  name: "budgetItem",
  initialState,
  reducers: {
    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state, action) => {
        state.budgetItemTable.isLoading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.budgetItemTable.isLoading = false;
        state.budgetItemTable.rows = action?.payload?.rows
          ?.sort((a, b) => {
            return moment(a.createdAt).valueOf() > moment(b.createdAt).valueOf()
              ? -1
              : 1;
          })
          ?.map((row, index) => {
            row.index = index + 1;
            row.createdAt = moment(row.createdAt)
              .tz("Asia/Hong_Kong")
              .format("YYYY-MM-DD HH:mm:ss");
            return row;
          });
        state.budgetItemTable.totalCount = action?.payload?.totalCount;
      })
      .addCase(search.rejected, (state, action) => {
        state.budgetItemTable.isLoading = false;
        state.budgetItemTable.rows = [];
        state.budgetItemTable.totalCount = 0;
      })
    //   .addCase(getVCard.fulfilled, (state, action) => {
    //     state.generateVCard = action?.payload?.data?.vCard;
    //     state.generateUUID = action?.payload?.data?.uuid;
    //   });
  },
});

export default BudgetItemSlice;
