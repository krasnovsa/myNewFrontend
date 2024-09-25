export const getServer = () => {
  if (typeof window !== "undefined") {
    const servType = localStorage.getItem("serverType");
    
    return {
      SERVER: "http://localhost:3000",
      API: "http://localhost:3000/api",
      servType:servType
    };
  }
};

export const setServType = (newServerType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("serverType", newServerType);
  }
};
