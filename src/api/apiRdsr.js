import { getServer } from "./getServer";
const {API} = getServer()
// router.get("/rdsr/get-list/:userId/", requireSignin, isAuth, getList);
export const getList = (token, userId, pageNumber, pageSize, textFilter) => {
  
  let tFilter = "";
  
  if (typeof textFilter === undefined) {
     tFilter = "";
  } else {
     tFilter = textFilter;
  };
  
  
  return fetch(
    `${API}/rdsr/get-list/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}&textFilter=${tFilter}&createdBy=${userId}`,
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
    // .catch((err) => {
    //   throw new Error(err.message);
    // });
};
// router.get("/rdsr/get-one/:userId/", requireSignin, isAuth, getOneById);
export const getOneById = (token, userId, rdId) => {
  
  return fetch(
    `${API}/rdsr/get-one/${userId}?rdId=${rdId}`,
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
    // .catch((err) => {
    //   throw new Error(err.message);
    // });
};


// router.get("/rdsr/add-by-res-ticket/:userId/", requireSignin, isAuth, addByResTicket);
export const addByResTicket = (token, userId, resTicketId) => {
  
  return fetch(
    `${API}/rdsr/add-by-res-ticket/${userId}?resTicketId=${resTicketId}`,
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
    // .catch((err) => {
    //   throw new Error(err.message);
    // });
};
// router.get("/rdsr/update-by-res-ticket/:userId/", requireSignin, isAuth, updateByResTicket);
export const updateByResTicket = (token, userId, resTicketId, rdId) => {
  
  return fetch(
    `${API}/rdsr/update-by-res-ticket/${userId}?resTicketId=${resTicketId}&rdId=${rdId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  )
    .then((response) => {
      return response.json();
    })
    // .catch((err) => {
    //   throw new Error(err.message);
    // });
};
// router.get("/rdsr/update/:userId/", requireSignin, isAuth, update);
export const update = (token, userId, rdsr) => {
  console.log('update rdsr', rdsr)
  return fetch(
    `${API}/rdsr/update/${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body : JSON.stringify(rdsr)
    }
  )
    .then((response) => {
      return response.json();
    })
    // .catch((err) => {
    //   throw new Error(err.message);
    // });
};


// router.get("/rdsr/save/:userId/", requireSignin, isAuth, save);
// router.get("/rdsr/entry/:userId/", requireSignin, isAuth, entry);
// router.get("/rdsr/unentry/:userId/", requireSignin, isAuth, unentry);
// router.get("/rdsr/remove/:userId/", requireSignin, isAuth, remove);
export const changeStatus = (token, userId, rdId, statusName) => {
  
  return fetch(
    `${API}/rdsr/${statusName}/${userId}?rdId=${rdId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(() => {
      console.log(statusName + ' OK')
    })
    // .catch((err) => {
    //   throw new Error(err.message);
    // });
};

