import { getServer } from "./getServer";
const { API } = getServer();
console.log("API", API);

export const getWlList = async (token, userId, options) => {
  const {
    emplId = 0,
    pageNumber = 1,
    pageSize = 30,
    dStart = "2021-01-01",
    dFin = "2031-01-01",
    direction = 0,
    oiId = 0,
    pjId = 0,
    opId = 0,
    prodId = 0,
  } = options;

  try {
    const response = await fetch(
      `${API}/wl/getlist/${userId}?emplId=${emplId}&pageNumber=${
        pageNumber}&pageSize=${pageSize}&dStart=${dStart}&dFin=${
          dFin}&direction=${direction}&prodId=${prodId}&oiId=${
            oiId}&pjId=${pjId}&opId=${opId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (result.error) {
      return { error: "db error " + result.error };
    }

    return result;
  } catch (err) {
    return { error: "fetch error " + err.message };
  }
};

export const getWlById = async (token, userId, wlId) => {
  try {
    const response = await fetch(
      `${API}/wl/getlist/${userId}?pageNumber=1&pageSize=1&wlId=${wlId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (result.error) {
      return { error: "db error " + result.error };
    }

    return result[0];
  } catch (err) {
    return { error: "fetch error " + err.message };
  }
};

export const addNew = async (token, userId, wlItem) => {
  try {
    const response = await fetch(`${API}/wl/addNew/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(wlItem),
    });

    const result = await response.json();

    if (result.error) {
      return { error: "db error " + result.error };
    }

    return result;
  } catch (err) {
    return { error: "fetch error " + err.message };
  }
};

export const update = async (token, userId, wlItem) => {
  console.log("update data", wlItem);
  try {
    const response = await fetch(`${API}/wl/update/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(wlItem),
    });

    const result = await response.json();

    if (result.error) {
      return { error: "db error " + result.error };
    }

    console.log("wl data updated", result);
    return result;
  } catch (err) {
    return { error: "fetch error " + err.message };
  }
};

export const remove = async (token, userId, wlId) => {
  try {
    const response = await fetch(`${API}/wl/remove/${userId}?wlId=${wlId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.error) {
      return { error: "db error " + result.error };
    }

    console.log("wl deleted");
    return result;
  } catch (err) {
    return { error: "fetch error " + err.message };
  }
};

export const getPjById = async (token, userId, pjId) => {
  try {
    const response = await fetch(`${API}/pj/getbyid/${userId}?pjId=${pjId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.error) {
      return { error: "db error " + result.error };
    }

    return result;
  } catch (err) {
    return { error: "fetch error " + err.message };
  }
};

export const getBtList = async (token, userId) => {
  try {
    const response = await fetch(`${API}/bt/getlist/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.error) {
      return { error: "db error " + result.error };
    }

    return result;
  } catch (err) {
    return { error: "fetch error " + err.message };
  }
};

export const getLabel = async (token, userId, wlId) => {
  try {
    const response = await fetch(`${API}/wl/getLabel/${userId}?wlId=${wlId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
