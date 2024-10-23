import { getServer } from "./getServer";
import { isAuthenticated } from "../auth/index";
const { API } = getServer();

// Метод для получения списка марок материалов
export const getMaterialMarksList = async () => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/mat-marks/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error fetching material marks list:", err);
    throw err;
  }
};

// Метод для получения информации о марке материала по Id
export const getMaterialMarkById = async (markId) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/mat-marks/${markId}/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(`Error fetching material mark with id ${markId}:`, err);
    throw err;
  }
};

// Метод для создания новой марки материала
export const createMaterialMark = async (mark) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/mat-marks/create/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mark),
    });
    return await response.json();
  } catch (err) {
    console.error("Error creating material mark:", err);
    throw err;
  }
};

// Метод для обновления данных о марке материала
export const updateMaterialMark = async (markId, mark) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/mat-marks/${markId}/${user._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mark),
    });
    return await response.json();
  } catch (err) {
    console.error(`Error updating material mark with id ${markId}:`, err);
    throw err;
  }
};

// Метод для удаления марки материала по Id
export const deleteMaterialMark = async (markId) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/mat-marks/${markId}/${user._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(`Error deleting material mark with id ${markId}:`, err);
    throw err;
  }
};