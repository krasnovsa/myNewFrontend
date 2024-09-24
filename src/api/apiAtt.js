import axios from "axios";
import { getServer } from "./getServer";
const {SERVER} = getServer()

export const getAttList = (token, userId, table, keyValue, parId, Id) => {
  return fetch(
    `${SERVER}/att/list/t/${table}/kv/${keyValue}/parId/${parId || 0}/Id/${
      Id || 0
    }/userId/${userId}`,

    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export function addFolder(
  token,
  userId,
  folderName,
  tableName,
  keyValue,
  relPath
) {
  return fetch(
    `${SERVER}/att/addFolder/${userId}?tableName=${tableName}&keyValue=${keyValue}&relPath=${relPath}&folderName=${folderName}`,

    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      console.log("responce", response);
      return response.json();
    })

    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
}

export function uploadFile(
  token,
  userId,
  file,
  tableName,
  keyValue,
  aType,
  relPath,
  changeProgress,
  uploadId
) {
  return async () => {
    //console.log('start transfer')
    try {
      const formData = new FormData();
      formData.append("file", file);

      formData.append("tableName", tableName);
      formData.append("keyValue", keyValue);
      formData.append("aType", aType);
      formData.append("relPath", relPath);

      const response = await axios.post(
        `${SERVER}/att/upload/${userId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              changeProgress(progress, uploadId);
            }
          },
        }
      );
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  };
}



export function removeAtt(token, userId, Id) {
  return async () => {
    try {
      console.log("start removing");
      const response = await axios.get(
        `${SERVER}/att/remove/${userId}?attId=${Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { message: "removing success" };
    } catch (e) {
      console.log(e);
    }
  };
}

export function downloadFile(Id, name) {
  //
  return fetch(`${SERVER}/att/file/${Id}?withDownload=true`, {
    method: "GET",
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
}
