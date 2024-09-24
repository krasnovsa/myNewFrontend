import { getServer } from "./getServer";
const {API} = getServer()

export const getExProps = (userId, token, oiId) => {
  return fetch(`${API}/oiExProps/${userId}?oiId=${oiId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
