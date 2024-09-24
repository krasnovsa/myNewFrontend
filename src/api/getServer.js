export const getServer = () => {
  if (typeof window !== "undefined") {
    const servType = localStorage.getItem("serverType");
    
    return {
      SERVER: servType==='ext'?process.env.REACT_APP_SERVER_EXT:process.env.REACT_APP_SERVER,
      API: servType==='ext'?process.env.REACT_APP_API_EXT:process.env.REACT_APP_API,
      servType:servType
    };
  }
};

export const setServType = (newServerType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("serverType", newServerType);
  }
};
