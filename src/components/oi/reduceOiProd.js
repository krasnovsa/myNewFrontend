const mapWl = (arr) => {
  try{return arr.map((it) => {
    it.oi = it.oiId
    return it;
  });}
  catch{return []}
};

const reduceOi = (arr) => {
  try{return arr.reduce(function (res, it) {
    res[it.oiSName] = res[it.oiSName] || {};

    res[it.oiSName].info = res[it.oiSName].info || {};

    res[it.oiSName].info = {
      ...res[it.oiSName].info,
      prodName: it.prodName,
      oiQtt: it.oiQtt,
      color:it.color,
      matMap:it.matMap,
      matSpec:it.matSpec,
      oiQttShipped:it.oiQttShipped,
      oiHrsProdused:it.oiHrsProdused,
      oiHrsSum:it.oiHrsSum,
      oiId:it.oiId,
      prodId:it.prodId,
      pjLastDatePr:it.pjLastDatePr,
      oiSName:it.oiSName,
      oiPercHrs:it.oiPercHrs
    };

    // res[it.oi].info.wSum =
    //   ('wSum' in wls[wlIt.uds].info ? wls[wlIt.uds].info.wSum : 0) +
    //   (wlIt.wSalary);

     res[it.oiSName].pjArr = [...(res[it.oiSName].pjArr || []), it];

    return res;
  }
  , [])}
  catch{
    return []
  }
  }

  export const reduceOiProd = (oiArr) => {
  return reduceOi(mapWl(oiArr));}



