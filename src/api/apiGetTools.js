import { getServer } from "./getServer";
const {API} = getServer()

export const getGtList = (token, userId, parAccId,textFilter, pageNumber, pageSize) => {
  
  let tFilter = "";
  
  if (typeof textFilter === undefined) {
     tFilter = "";
  } else {
     tFilter = textFilter;
  };
  console.log("tfilter", tFilter)


  return fetch(
    `${API}/gt/getlist/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}&textFilter=${textFilter}&parAccId=${parAccId}`,
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
      return result.json();
    })
    .catch((err) => console.log(err));
};

export const openCell = (token, userId, accId) => {
 
  return fetch(
    `${API}/gt/opencell/${userId}?accId=${accId}`,
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
      return result.json();
    })
    .catch((err) => console.log(err));
};

export const runDoc = (token, userId, accId, resId, resTable, reservId, qtt, mainUn) => {
 
  return fetch(
    `${API}/gt/rundoc/${userId}?accId=${accId}&resId=${resId}&resTable=${resTable}&reservId=${reservId}&qtt=${qtt}&unId=${mainUn}`,
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
     console.log(result) 
     return result.json();
      
    })
    .catch((err) => console.log(err));
};

export const checkAccess = (token, userId, accId) => {
 
  return fetch(
    `${API}/gt/checkaccess/${userId}?accId=${accId}`,
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
      return result.json();
    })
    .catch((err) => {return {error : err}} );
};

export const AccList = [
  {accId:2425,
  accName:'Сейф 2 на складе'},
  {accId:4429,
  accName:'Склад в офисе АДМ'},
  {accId:18710,
  accName:'Метчики'},
  {accId:19038,
  accName:'Сверла'},
  {accId:19044,
  accName:'Державки'},
  {accId:19357,
  accName:'Инструментальный шкаф №1'},

  
]


