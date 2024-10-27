import { getServer } from "./getServer";
import { isAuthenticated } from "../auth/index";
const { API } = getServer();

// Получение информации о продукте по Id
export const getProductById = async (prodId) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(
      `${API}/product/${prodId}/${user._id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// Создание нового продукта
export const createProduct = async (product) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(
      `${API}/product/create/${user._id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// Обновление данных о продукте
export const updateProduct = async (prodId, product) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(
      `${API}/product/${prodId}/${user._id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// Удаление продукта по Id
export const deleteProduct = async (prodId) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(
      `${API}/product/${prodId}/${user._id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// Получение данных по процедуре ProdCalcPriceList
export const getProdCalcPriceList = async (prodId, queryParams) => {
  const { user, token } = isAuthenticated();
  const queryString = new URLSearchParams(queryParams).toString();
  try {
    const response = await fetch(
      `${API}/product/${prodId}/calc-price-list/${user._id}?${queryString}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// Получение истории цен
export const getPriceHistory = async (prodId) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(
      `${API}/product/${prodId}/price-history/${user._id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};



