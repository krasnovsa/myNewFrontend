import { getServer } from "./getServer";
const { API } = getServer();

// Получение информации о продукте по Id
export const getProductById = async (userId, token, prodId) => {
  try {
    const response = await fetch(
      `${API}/product/${prodId}/${userId}`,
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
export const createProduct = async (userId, token, product) => {
  try {
    const response = await fetch(
      `${API}/product/create/${userId}`,
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
export const updateProduct = async (userId, token, prodId, product) => {
  try {
    const response = await fetch(
      `${API}/product/${prodId}/${userId}`,
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
export const deleteProduct = async (userId, token, prodId) => {
  try {
    const response = await fetch(
      `${API}/product/${prodId}/${userId}`,
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