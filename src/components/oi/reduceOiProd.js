const mapWl = (arr) => {
  try {
    return arr.map((it) => {
      it.oi = it.oiId;
      return it;
    });
  } catch {
    return [];
  }
};

const reduceOi = (arr) => {
  try {
    return arr.reduce(function (res, it) {
      res[it.oiSName] = res[it.oiSName] || {};

      res[it.oiSName].info = res[it.oiSName].info || {};

      res[it.oiSName].info = {
        ...res[it.oiSName].info,
        prodName: it.prodName,
        oiQtt: it.oiQtt,
        color: it.color,
        matMap: it.matMap,
        matMapNoHTML: it.matMapNoHTML,
        matSpec: it.matSpec,
        oiQttShipped: it.oiQttShipped,
        oiHrsProdused: it.oiHrsProdused,
        oiHrsSum: it.oiHrsSum,
        oiId: it.oiId,
        prodId: it.prodId,
        pjLastDatePr: it.pjLastDatePr,
        oiSName: it.oiSName,
        oiPercHrs: it.oiPercHrs,
        shipCalendar: it.shipCalendar, // добавлено поле shipCalendar
        matSpec: it.matSpec,           // добавлено поле matSpec
        matMap: it.matMap              // добавлено поле matMap
      };

      res[it.oiSName].pjArr = [...(res[it.oiSName].pjArr || []), it];

      return res;
    }, []);
  } catch {
    return [];
  }
};

export const reduceOiProd = (oiArr) => {
  return reduceOi(mapWl(oiArr));
};