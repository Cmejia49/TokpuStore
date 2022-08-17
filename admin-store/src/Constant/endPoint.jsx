const baseAddress = "https://api.tokpustore.online/";
//const baseAddress = "https://localhost:5001/";
export const loginEndPoint = baseAddress+"api/v1/Auth/Login";
export const registerEndPoint = baseAddress+"api/v1/Auth/Register";

export const authEndpoint = baseAddress+"api/v1/Auth";

export const getItemEndPoint = baseAddress+"api/v1/Item/item";

export const getCatEndPoint = baseAddress+"api/v1/Category";

export const getStoreEndPoint = baseAddress+"api/v1/Store";
export const postItemEndPoint = baseAddress +"api/v1/Item"

export const dashboardSummaryEndPoint = baseAddress+"api/v1/Dashboard/Report"
export const dashboardSaleEndPoint = baseAddress +"api/v1/Dashboard/sale";
export const dashboardDamageEndPoint = baseAddress +"api/v1/Dashboard/Damage";
export const dashboardExpensesEndPoint = baseAddress+"api/v1/Dashboard/Expenses";

export const saleHistoryEndpoint = baseAddress+"api/v1/SaleItem";
export const expensesHistoryEndpoint = baseAddress+"api/v1/Expenses";
export const damageHistoryEndpoint = baseAddress+"api/v1/DamageReport";