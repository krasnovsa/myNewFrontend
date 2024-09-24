export const fileType = (file) => {
  const {fName, aType}=file

  if (aType==='Folder') {
    return 'folder'
  }
  if(fName)  
  {let arr = fName.split(".");
    if (arr?.length == 0) {
      return false;
    }
    let ext = arr.pop();
    if (["jpg", "jpeg", "tiff", "tif",  "png", "svg"].includes(ext.toLowerCase())) {
      return 'image';
    }    
    if (["pdf"].includes(ext.toLowerCase())) {
      return 'pdf';
    }
  return 'txt'
  }
   return ''
  };


  export const trimFName =(fName, start=10, fin=5) =>{
    if (fName.length<(fin+start)) {return fName}
    let arr = fName.split('')
    //console.log('arr',[...  arr.slice(0,4) , '...', ...arr.slice(arr.length-6,arr.length) ].join(''))
    let newName=[ ...  arr.slice(0,start) , '...', ...arr.slice(arr.length-fin,arr.length) ].join('')
    return newName
  }