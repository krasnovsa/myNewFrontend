export const reduceOrdArr = (ordArr) => {
  let arr = [...ordArr] ;

  return ordArr.reduce((acc, it, i) => {
    
    let ordId = it.ordId;
    let subOrds = arr.filter((itm) => {
      return itm.parId === ordId;
    });
    let indx = acc.findIndex((item)=>{return item.ordId===ordId})
    if(indx===-1){ return acc}
    acc[indx].subOrds = subOrds || [];
    return acc.filter((it) => {
      return it.parId !== ordId;
    });
  }, arr);
};
