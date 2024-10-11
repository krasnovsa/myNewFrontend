import { getServer } from "./getServer";
const { API } = getServer();

export const getTechProcessList = async (token, userId, prodId) => {
  try {
    const response = await fetch(
      `${API}/tp/list/${userId}?prodId=${prodId}`,
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

export const setTechProcessDefault = async (token, tpId, userId) => {
  try {
    const response = await fetch(
      `${API}/tp/set-default/${tpId}/${userId}`,
      {
        method: "POST",
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

export const deleteTechProcess = async (token, tpId, userId) => {
  try {
    const response = await fetch(
      `${API}/tp/delete/${tpId}/${userId}`,
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

export const createTechProcessWithOperations = async (token, userId, techProcessData) => {
  try {
    const response = await fetch(
      `${API}/tp/create/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(techProcessData),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// Новый метод для обновления tpItem
export const updateTpItem = async (token, userId, tpItemData) => {
  try {
    const response = await fetch(
      `${API}/tp/update/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tpItemData),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};