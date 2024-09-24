import { getServer } from "./getServer";
const {API} = getServer()
// router.get("/rdsr/get-list/:userId/", requireSignin, isAuth, getList);


// router.get("/rdsr/tp/:userId/", requireSignin, getTablePart);
export const getTp = (token, userId, rdId) => {
  
  return fetch(
    `${API}/rdsr/tp/${userId}?rdId=${rdId}`,
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
      throw new Error(err.message);
    });
};
export const getTickets = (token, userId, rdId) => {
  
  return fetch(
    `${API}/rdsr/tp-tickets/${userId}?rdId=${rdId}`,
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
      console.log('getTickets', response)
      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};


// router.post("/rdsr/insert-tp-item/:userId/", requireSignin, isAuth, insertTPItem);
export const insertTpItem = (token, userId, rdsrTp) => {
  
  return fetch(
    `${API}/rdsr/insert-tp-item/${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rdsrTp),

    }
  )
    .then((response) => {
      return response.json();
    })
    // .catch((err) => {
    //   throw new Error(err.message);
    // });
};

// router.post("/rdsr/update-tp-item/:userId/", requireSignin, isAuth, updateTPItem);
export const updateTpItem = (token, userId, rdsrTp) => {
  
  return fetch(
    `${API}/rdsr/update-tp-item/${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rdsrTp),

    }
  )
    .then((response) => {
      return response.json();
    })
    // .catch((err) => {
    //   throw new Error(err.message);
    // });
};
// router.delete("/rdsr/delete-tp-item/:userId/", requireSignin, isAuth, deleteTPItem);
export const deleteTpItem = (token, userId, rdId) => {
  
  return fetch(
    `${API}/rdsr/delete-tp-item/${userId}?Id=${rdId}`,
    {
      method: "DELETE",
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

export const printTickets = (token, userId, rdId) => {
  
  return fetch(
    `${API}/rdsr/print/${userId}?rdId=${rdId}`,
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
      
    })
    
};
