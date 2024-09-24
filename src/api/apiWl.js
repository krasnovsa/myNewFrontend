import { getServer } from "./getServer";
const {API} = getServer()
console.log('API',API)

export const getWlList = (token, userId, options) => {
  const {
    emplId,
    pageNumber,
    pageSize,
    dStart,
    dFin,
    direction,
    oiId,
    pjId,
    opId,
    prodId,
  } = options;
  return fetch(
    `${API}/wl/getlist/${userId}?&emplId=${emplId ? emplId : 0}&pageNumber=${
      pageNumber ? pageNumber : 1
    }&pageSize=${pageSize ? pageSize : 30}&dStart=${
      dStart ? dStart : "2021-01-01"
    }&dFin=${dFin ? dFin : "2031-01-01"}&direction=${
      direction ? direction : 0
    }&prodId=${prodId ? prodId : 0}&oiId=${oiId ? oiId : 0}&pjId=${
      pjId ? pjId : 0
    }&opId=${opId ? opId : 0}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((result) => {
      if (result.error) {
        return { error: "db error " + result.error };
      }
      return result.json();
    })
    .catch((err) => {
      return { error: "fetch error" & err.message };
    });
};

export const getWlById = (token, userId, wlId) => {
  return fetch(
    `${API}/wl/getlist/${userId}?pageNumber=1&pageSize=1&wlId=${wlId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((result) => {
      if (result.error) {
        return { error: "db error " + result.error };
      }
      return result[0].json();
    })
    .catch((err) => {
      return { error: "fetch error" & err.message };
    });
};

export const addNew = (token, userId, wlItem) => {
  return fetch(`${API}/wl/addNew/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(wlItem),
  })
    .then((result) => {
      if (result.error) {
        return { error: "db error " + result.error };
      }
      return result;
    })
    .catch((err) => {
      return { error: "fetch error" & err.message };
    });
};

export const update = (token, userId, wlItem) => {
  console.log("update data", wlItem);
  return fetch(`${API}/wl/update/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(wlItem),
  })
    .then((result) => {
      if (result.error) {
        return { error: "db error " + result.error };
      }
      console.log("wl data updated", result);
      return result;
    })
    .catch((err) => {
      return { error: "fetch error" & err.message };
    });
};

export const remove = (token, userId, wlId) => {
  return fetch(`${API}/wl/remove/${userId}?wlId=${wlId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      if (result.error) {
        return { error: "db error " + result.error };
      }
      console.log("wl deleted");
      return result;
    })
    .catch((err) => {
      return { error: "fetch error" & err.message };
    });
};

export const getPjById = (token, userId, pjId) => {
  return fetch(`${API}/pj/getbyid/${userId}?pjId=${pjId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      if (result.error) {
        return { error: "db error " + result.error };
      }
      return result.json();
    })
    .catch((err) => {
      return { error: "fetch error" & err.message };
    });
};

export const getBtList = (token, userId) => {
  return fetch(`${API}/bt/getlist/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      if (result.error) {
        return { error: "db error " + result.error };
      }
      return result.json();
    })
    .catch((err) => {
      return { error: "fetch error" & err.message };
    });
};

export const getLabel = (token, userId, wlId) => {
  return fetch(`${API}/wl/getLabel/${userId}?wlId=${wlId}`, {
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
    .catch((err) => {
      throw new Error(err.message);
    });
};
