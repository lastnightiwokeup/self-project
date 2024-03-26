import { createSlice, isRejected, isPending, isFulfilled } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import * as BudgetItemSlice from '../../../pages/BudgetItemSlice';

const emptyNotification = {
  alertId: null,
  severity: null,
  message: null,
};

const notificationOf = (severity, message) => {
  return {
    alertId: uuidv4(),
    severity,
    message,
  }
};

const initialState = emptyNotification;

const monitorSuccessThunks = [
    BudgetItemSlice.createBudgetItem,
];

const monitorErrorThunks = [...monitorSuccessThunks];

export const NotificationSnackbarSlice = createSlice(
  {
    name: 'snackbarNotification',
    initialState,
    reducers: {
      appendNotification: (state, action) => {
        return notificationOf(action.payload.severity, action.payload.message);
      },
    },
    extraReducers: (builder) => {
      builder
        .addMatcher(isPending(...new Set([...monitorErrorThunks, ...monitorSuccessThunks])), (state, action) => {
          return emptyNotification;
        })
        .addMatcher(isFulfilled(...monitorSuccessThunks), (state, action) => {
          return notificationOf("success", action.payload.message);
        })
        .addMatcher(isRejected(...monitorErrorThunks), (state, action) => {
          return notificationOf("warning", action.error.message);
        })
    }
  }
);

export default NotificationSnackbarSlice;
