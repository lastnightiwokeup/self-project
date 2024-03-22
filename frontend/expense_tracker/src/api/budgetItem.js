import axiosWrapper from "./wrapper";

export function create({ itemName, amount, category, date }) {
  const response = axiosWrapper("post", "/api/budgetItem/create", {
    itemName: itemName,
    amount: amount,
    category: category,
    date: date,
  });
  return response;
}

export function search({
  itemName,
  amount,
  date,
  category
}) {
  const response = axiosWrapper("post", "/api/budgetItem/search", {
    itemName: itemName,
    amount: amount,
    date: date,
    category: category
  });
  return response;
}