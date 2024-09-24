const mapWl = (wl) => {
  try{return wl.map((wlIt) => {
    wlIt.uds = wlIt.emplId + "_" + wlIt.wDate + "_" + wlIt.wShift;
    return wlIt;
  });}
  catch{return []}
};

const reduceWlog = (wl) => {
  try{return wl.reduce(function (wls, wlIt) {
    wls[wlIt.uds] = wls[wlIt.uds] || [];

    wls[wlIt.uds].info = wls[wlIt.uds].info || {};

    wls[wlIt.uds].info = {
      ...wls[wlIt.uds].info,
      wDate: wlIt.wDate,
      wShift: wlIt.wShift,
      eFio:wlIt.eFio
    };

    wls[wlIt.uds].info.wSum =
      ('wSum' in wls[wlIt.uds].info ? wls[wlIt.uds].info.wSum : 0) +
      (wlIt.wSalary);

    wls[wlIt.uds].reports = [...(wls[wlIt.uds].reports || []), wlIt];

    return wls;
  }
  , {})}
  catch{
    return []
  }
  }

  export const reduceWl = (wl) => {
  return reduceWlog(mapWl(wl));
};
//console.log(mapWl(wl))
