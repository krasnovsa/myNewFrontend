import axios from "axios";
import { getServer } from "./getServer";
const { SERVER } = getServer();

export const getAttList = async (token, userId, table, keyValue, parId, Id) => {
  try {
    const response = await fetch(
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
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const addFolder = async (
  token,
  userId,
  folderName,
  tableName,
  keyValue,
  relPath
) => {
  try {
    const response = await fetch(
      `${SERVER}/att/addFolder/${userId}?tableName=${tableName}&keyValue=${keyValue}&relPath=${relPath}&folderName=${folderName}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    return await response.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const uploadFile = (
  token,
  userId,
  file,
  tableName,
  keyValue,
  aType,
  relPath,
  changeProgress,
  uploadId
) => {
  return async () => {
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
};

export const removeAtt = (token, userId, Id) => {
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
};

export const downloadFile = async (Id, name) => {
  try {
    const response = await fetch(`${SERVER}/att/file/${Id}?withDownload=true`, {
      method: "GET",
    });
    const blob = await response.blob();
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
  } catch (err) {
    console.log(err);
  }
};
