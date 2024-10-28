import { getServer } from "./getServer";
import { isAuthenticated } from "../auth/index"; // Импортируем isAuthenticated

const { API } = getServer();

export const getSiList = async (queryParams) => {
  const { user, token } = isAuthenticated(); // Получаем данные о пользователе и токене
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await fetch(`${API}/si-list?${queryString}`, {
      method: "GET",
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