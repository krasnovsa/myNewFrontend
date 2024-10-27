import { getServer } from "./getServer";
import { isAuthenticated } from "../auth/index"; // Импортируем isAuthenticated
const { API } = getServer();

export const getTechProcessList = async (prodId) => {
  const { user, token } = isAuthenticated(); // Получаем данные о пользователе и токене
  try {
    const response = await fetch(
      `${API}/tp/list/${user._id}?prodId=${prodId}`,
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

export const setTechProcessDefault = async (tpId) => {
  const { user, token } = isAuthenticated(); // Получаем данные о пользователе и токене
  try {
    const response = await fetch(`${API}/tp/set-default/${tpId}/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteTechProcess = async (tpId) => {
  const { user, token } = isAuthenticated(); // Получаем данные о пользователе и токене
  try {
    const response = await fetch(`${API}/tp/delete/${tpId}/${user._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createTechProcessWithOperations = async (techProcessData) => {
  const { user, token } = isAuthenticated(); // Получаем данные о пользователе и токене
  try {
    const response = await fetch(`${API}/tp/create/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(techProcessData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateTpItem = async (tpItemData) => {
  const { user, token } = isAuthenticated(); // Получаем данные о пользователе и токене
  try {
    const response = await fetch(`${API}/tp/update/${user._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tpItemData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addOperationToTechProcess = async (tpId, prodId, operation) => {
  const { user, token } = isAuthenticated(); // Получаем данные о пользователе и токене
  try {
    const response = await fetch(
      `${API}/tp/add-operation/${tpId}/${prodId}/${user._id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ operation: operation }), // Отправляем объект operation в теле запроса
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
