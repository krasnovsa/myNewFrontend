import { getServer } from "./getServer";
const {API} = getServer()


export const getOrderList = (token, userId, filterStr, loadMode) => {
console.log('start search', filterStr)
  return fetch(
    `${API}/ord/list/${userId}?filterStr=${filterStr}&loadMode=${loadMode}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
      
    })
    .catch((err) => {
      throw new Error(err)
    });
};

export const getProdInfoById = (token, userId, Id) => {

  return fetch(
    `${API}/ord/prod/${userId}?Id=${Id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
      
    })
    .catch((err) => {
      throw new Error(err)
    });
};