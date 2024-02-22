import { configureStore } from '@reduxjs/toolkit'

import BudgetItemSlice from '../pages/BudgetItemSlice'

export default configureStore({
  reducer: {
    budgetItem: BudgetItemSlice.reducer
  },
})