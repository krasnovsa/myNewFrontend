import { getServer } from "./getServer";
const { API } = getServer();

// Метод для получения типов профилей материалов
export const getMaterialProfileTypes = async (userId, token) => {
  try {
    const response = await fetch(`${API}/material-profiles/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error fetching material profile types:", err);
    throw err;
  }
};

// Метод для получения списка материалов
export const getMaterialsList = async (userId, token) => {
  try {
    const response = await fetch(`${API}/materials/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error fetching materials list:", err);
    throw err;
  }
};

// Метод для получения информации о материале по Id
export const getMaterialById = async (id, userId, token) => {
  try {
    const response = await fetch(`${API}/material/${id}/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(`Error fetching material with id ${id}:`, err);
    throw err;
  }
};

// Метод для создания нового материала
export const createMaterial = async (userId, token, material) => {
  try {
    const response = await fetch(`${API}/material/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(material),
    });
    return await response.json();
  } catch (err) {
    console.error("Error creating material:", err);
    throw err;
  }
};

// Метод для обновления данных о материале
export const updateMaterial = async (id, userId, token, material) => {
  try {
    const response = await fetch(`${API}/material/${id}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(material),
    });
    return await response.json();
  } catch (err) {
    console.error(`Error updating material with id ${id}:`, err);
    throw err;
  }
};

// Метод для удаления материала по Id
export const deleteMaterial = async (id, userId, token) => {
  try {
    const response = await fetch(`${API}/material/${id}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(`Error deleting material with id ${id}:`, err);
    throw err;
  }
};

// Метод для поиска материалов по параметрам
export const findMaterialByParams = async (userId, token, params) => {
  try {
    const response = await fetch(`${API}/materials/search/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    return await response.json();
  } catch (err) {
    console.error("Error searching materials by params:", err);
    throw err;
  }
};
