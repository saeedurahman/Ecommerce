const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PRODUCTS = "products";
const USER = "user";
const LOGIN = "login";

// const USER_API_BASE_URL =
//   "https://ca8b315758820476137c.free.beeceptor.com/api/users";

const USER_API_BASE_URL =
  "https://caa576a2ec29ec96b2c5.free.beeceptor.com/api/users";

// AUTH

export const LOGIN_URL = `${API_BASE_URL}/${USER}/${LOGIN}`;

// PRODUCTS
export const PRODUCTS_URL = `${API_BASE_URL}/${PRODUCTS}`;

export const USER_URL = USER_API_BASE_URL;
