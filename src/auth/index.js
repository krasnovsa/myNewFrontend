import { getServer } from '../api/getServer';
const { API, SERVER } = getServer();

export const login = async (user) => {
  console.log('API is', API, 'server', SERVER);
  try {
    const response = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    try {
      const response = await fetch(`${API}/signout`, {
        method: "GET",
      });
      console.log("signout", response);
    } catch (err) {
      console.log(err);
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const checkWebRole = (webRoles = [], roleName) => {
  if (webRoles?.length) {
    const role = webRoles.find((webRole) => webRole.name === roleName);
    if (role) {
      return role.roleId;
    }
  }
  return 0;
};