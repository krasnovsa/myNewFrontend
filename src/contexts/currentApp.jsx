import React, { createContext, useReducer } from "react";
import { isAuthenticated } from "../auth/index";
import { getOneById, update } from "../api/apiRdsr";

const initialState = {
  currentBox: {
    prodName: "",
    fName: "",
    cName: "",
    Id: null,
    qtt: null,
  },
  currentRdsr: {
    rdId: 0,
    createdById: "",
    dateCreated: "",
    statusId: 0,
    typeId: 0,
    accId: 0,
    accTable: "",
    btId: 0,
    propId: "",
    reservId: 0,
    reservTable: "",
    resId: 0,
    resTable: "",
    accName: "",
    resName: "",
    oiSName: "",
    btName: "",
    userName: "",
    resQttCalc: 0,
    resQttTicket: 0,
    statusName: 0,
  },
  currentGt: {
    accId: 0,
    resId: 0,
    resTable: "",
    reservId: 0,
    resQtt: 0,
    accName: "",
    resName: "",
    reservDef: "",
  },

  btList: [],

  curOrder: {
    ordId: 0,
    invoiceId: "",
    dateCreated: "2021-01-01",
    isClosed: false,
    isOpen: false,
    isDirty: false,
    persShipped: 0,
    Rang: 50,
    custSName: "",
    descr: null,
    ordProdProgress: 0,
    checkMat: 1,
    plSt: -10,
    shPrice: 0,
    ordPrice: 0,
    hrsProdused: 0,
    hrsPlan: 0,
    isCO: true,
    isPO: true,
    parID: 0,
    nzp: 0,
    firmId: 16,
    invNom: "",
  },

  curOiProd: {},
  curPj: {},
  extAllPj: false,
  ordFilterStr: "",

  currentWl: {
    wlId: 0,
    wDate: "",
    wShift: 0,
    btId: 0,
    qtt: 0,
    tOne: 0,
    wName: "",
    note: "",
    wTypeId: 0,
    unName: "",
  },
  rdsrList: [],
  rdsrListIsChanged: false,
  rdsrStatusTheme: {
    50: "info",
    51: "primary",
    52: "secondary",
  },
  rdsrQtts: {
    usedQtt: 0,
    restQtt: -1,
    isValid: false,
  },
  extServer: "",
  extApi: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_BOX":
      return {
        ...state,
        currentBox: action.payload,
      };

    case "SET_CURRENT_GT":
      return {
        ...state,
        currentGt: action.payload,
      };

    case "SET_CURRENT_WL":
      return {
        ...state,
        currentWl: action.payload,
      };

    case "SET_CURRENT_RDSR":
      return { ...state, currentRdsr: action.payload };

    case "SET_RDSR_LIST":
      return { ...state, rdsrList: action.payload };

    case "SET_BT_LIST":
      return { ...state, btList: action.payload };

    case "SET_RDSRLIST_CHANGED":
      return { ...state, rdsrListChanged: action.payload };

    case "SET_RDSR_QTTS":
      return { ...state, rdsrQtts: action.payload };

    case "SET_CURRENT_ORDER":
      return { ...state, curOrder: action.payload };

    case "SET_CURRENT_OIPROD":
      return { ...state, curOiProd: action.payload };

    case "SET_CURRENT_PJ":
      return { ...state, curPj: action.payload };

    case "SET_EXT_ALL_PJ":
      return { ...state, extAllPj: action.payload };

    case "SET_ORD_FILTER_STR":
      return { ...state, ordFilterStr: action.payload };

    case "SET_EXT_SERVER":
      return { ...state, extServer: action.payload };

    case "SET_EXT_API":
      return { ...state, extServer: action.payload };

    

    default:
      return state;
  }
};

export const CurrentAppContext = createContext();

export const CurrentAppProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return (
    <CurrentAppContext.Provider value={value}>
      {children}
    </CurrentAppContext.Provider>
  );
};
