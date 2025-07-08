import { api } from './index';

export const getImages = (files) => {
  const formData = new FormData();
  const fileList = Array.isArray(files) ? files : [files];

  fileList.forEach((file) => {
    formData.append("file", file);
  });

  return api.post('/upload/images', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};