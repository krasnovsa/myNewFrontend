

//const SERVER = process.env.REACT_APP_SERVER
import { getServer } from "./getServer";
const {API} = getServer()


export const getBoxList = (token, userId, pageNumber, pageSize, textFilter) => {
  
  let tFilter = "";
  
  if (typeof textFilter === undefined) {
     tFilter = "";
  } else {
     tFilter = textFilter;
  };
  

  
  return fetch(
    `${API}/box/getlist/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}&textFilter=${tFilter}`,
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
    .catch((err) => console.log(err));
};

// router.post("/box/update/:userId/",  update);
// router.post("/box/:boxId/double/:userId/",  double);

export const update = (token, userId, box) => {
  console.log("update box", box);
  return fetch(`${API}/box/update/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(box),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const double = (token, userId, boxId) => {
  return fetch(`${API}/box/double/${userId}?boxId=${boxId}`, {
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

export const addnew = (token, userId, box) => {
  console.log("update box", box);
  return fetch(`${API}/box/addnew/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(box),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}

export const remove = (token, userId, boxId) => {
  console.log("remove box", boxId);
  return fetch(`${API}/box/remove/${userId}?boxId=${boxId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  }

  export const printLabel = (token, userId, boxId) => {
    console.log("remove box", boxId);
    return fetch(`${API}/box/label/${userId}?boxId=${boxId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
    }
  
