import { getServer } from "./getServer";
import { isAuthenticated } from "../auth/index";
const { API } = getServer();

// Метод для получения типов профилей материалов
export const getMaterialProfileTypes = async () => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/material-profiles/${user._id}`, {
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
export const getMaterialsList = async () => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/materials/${user._id}`, {
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
export const getMaterialById = async (id) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/material/${id}/${user._id}`, {
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

// Метод для получения списка марок материалов
export const getMaterialMarksList = async () => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/material-marks/${user._id}`, {
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

// Метод для поиска материала по параметрам
export const findMaterialByParams = async (params) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/materials/search/${user._id}`, {
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
    console.error("Error finding material by params:", err);
    throw err;
  }
};

// Метод для создания нового материала
export const createMaterial = async (material) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/material/create/${user._id}`, {
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

// Метод для обновления существующего материала
export const updateMaterial = async (id, material) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/material/${id}/${user._id}`, {
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