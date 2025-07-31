export const BASE_URL = 'https://money-manager-api-bzti.onrender.com/api/v1.0';
//export const BASE_URL = 'http://localhost:8080/api/v1.0';
const CLOUDINARY_CLOUD_NAME = 'dgelnixbt';
//export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CL

 export const apiEndpoints = {
  LOGIN: '/login',
  SIGNUP: '/register',
  ACTIVATE_ACCOUNT: (token) => `/activate?token=${token}`,
  GET_USER_INFO: '/profile',
  GET_ALL_CATEGORIES: '/categories',
  ADD_CATEGORY: '/categories',
  UPDATE_CATEGORY:(categoryId) => `/categories/${categoryId}`,
  GET_INCOMES: '/incomes',
  CATEGORIES_TYPES: (type)=>`/categories/${type}`,
  ADD_INCOME: '/incomes',
  DELETE_INCOME:(id)=>`/incomes/${id}`,
  INCOME_EXCEL_DOWNLOAD: '/excel/download/income',
  INCOME_SEND_EMAIL: '/email/income-excel',
  APPLY_FILTERS: '/filter',
  DASHBOARD_DATA: '/dashboard',
  ADD_EXPENSE: '/expenses',
   GET_EXPENSES: '/expenses',
  DELETE_EXPENSE:(id)=>`/expenses/${id}`,
  EXPENSE_EXCEL_DOWNLOAD: '/excel/download/',
  EXPENSE_SEND_EMAIL: '/email/expense-excel',
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
 }