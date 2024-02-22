import axiosWrapper from "./wrapper";

export function create({itemName, amount, category, date}) {
    const response = axiosWrapper(
      "post",
      '/api/budgetItem/create',
      {
        itemName: itemName,
        amount: amount,
        category: category,
        date: date,
      }
    );
    return response;
  }