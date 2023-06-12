import Axios from ".";

// Upload file

export const uploadFile = async (localUri) => {
  try {
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    formData.append("file", { uri: localUri, name: filename, type, size: 100 });

    const { data } = await Axios.post(`/files/upload`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    return data.url;
  } catch (err) {
    throw err;
  }
};

export const uploadFileV2 = async (file) => {
  try {
    let formData = new FormData();
    formData.append("file", { ...file, type: file.mimeType });

    const { data } = await Axios.post(`/files/upload`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    return data;
  } catch (err) {
    console.log("Catch Upload File: " + err.response.data);
    throw err;
  }
};
