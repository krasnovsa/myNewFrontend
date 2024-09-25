import { getServer } from "./getServer";
const { API } = getServer();

export const getOrderList = async (token, userId, filterStr, loadMode) => {
  console.log('start search', filterStr);
  try {
    const response = await fetch(
      `${API}/ord/list/${userId}?filterStr=${filterStr}&loadMode=${loadMode}`,
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

export const getProdInfoById = async (token, userId, Id) => {
  try {
    const response = await fetch(
      `${API}/ord/prod/${userId}?Id=${Id}`,
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