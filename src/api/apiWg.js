import { getServer } from "./getServer";
const { API } = getServer();

// Получение списка рабочих групп
export const getWorkGroupsList = async (userId, token) => {
  try {
    const response = await fetch(
      `${API}/workgroups/${userId}`,
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

// Получение информации о рабочей группе по Id
export const getWorkGroupById = async (userId, token, workGroupId) => {
  try {
    const response = await fetch(
      `${API}/workgroup/${workGroupId}/${userId}`,
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

// Обновление данных о рабочей группе
export const updateWorkGroup = async (userId, token, workGroupId, workGroup) => {
  try {
    const response = await fetch(
      `${API}/workgroup/${workGroupId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workGroup),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// Удаление рабочей группы по Id
export const deleteWorkGroup = async (userId, token, workGroupId) => {
  try {
    const response = await fetch(
      `${API}/workgroup/${workGroupId}/${userId}`,
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