import axiosWrapper from "./wrapper";

export function search({
  id,
  itemName,
  amount,
  date,
  category,
  pageSize,
  pageNum,
}) {
  const response = axiosWrapper("post", "/api/budgetItem/search", {
    id: id,
    itemName: itemName,
    amount: amount,
    date: date,
    category: category,
    pageSize: pageSize,
    pageNum: pageNum,
  });
  return response;
}

export function create({ itemName, amount, category, date }) {
  const response = axiosWrapper("post", "/api/budgetItem/create", {
    itemName: itemName,
    amount: amount,
    category: category,
    date: date,
  });
  return response;
}

export function edit(payload) {
  const response = axiosWrapper("post", "/api/budgetItem/edit", payload);
  return response;
}

export function deleteItem({ id }) {
  const response = axiosWrapper("post", "/api/budgetItem/deleteItem", {
    id: id,
  });
  return response;
}
