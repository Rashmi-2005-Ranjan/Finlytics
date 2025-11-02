export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/public-profile",
    GET_ALL_CATEGORIES: "categories/get-categories",
    ADD_CATEGORY: "categories/add-category",
    UPDATE_CATEGORY: (categoryId) => `categories/update-category/${categoryId}`,
    GET_ALL_INCOMES: "incomes/current-month-incomes",
    GET_ALL_EXPENSES:"expenses/current-month-expenses",
    GET_CATEGORY_BY_TYPE: (type) => `categories/get-categories-by-type/${type}`,
    ADD_INCOME: "incomes/add-income",
    ADD_EXPENSE: "expenses/add-expense",
    DELETE_INCOME: (id) => `incomes/delete-income/${id}`,
    DELETE_EXPENSE: (id) => `expenses/delete-expense/${id}`,
    INCOME_EXCEL_DOWNLOAD: "excel/download/income",
    EXPENSE_EXCEL_DOWNLOAD: "excel/download/expense",
    EMAIL_INCOME_DETAILS: "email/income-excel",
    EMAIL_EXPENSE_DETAILS: "email/expense-excel",
    APPLY_FILTERS:"filter/transactions",
    DASHBOARD_DATA:"dashboard/data",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}