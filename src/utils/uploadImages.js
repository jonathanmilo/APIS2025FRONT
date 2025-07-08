import {api} from '@src/api/index';

export const uploadImages = async (images) => {
  const urls = [];
  const files = Array.isArray(images) ? images : [images];

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });

  try {
    const response = await api.post("/upload/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data; 
    } else {
      console.error("Error al subir las imágenes:", response);
    }
  } catch (error) {
    console.error("Fallo en uploadImages():", error);
  }

  return urls; // en caso de error devuelve array vacío
};