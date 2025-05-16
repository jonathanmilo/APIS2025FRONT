export const uploadImages = async (images) => {
  const API_KEY = ""; 
  const EXPIRATION_TIME = 1200; // 20 minutos
  const urls = [];

  const files = Array.isArray(images) ? images : [images];

  for (const image of files) {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}&expiration=${EXPIRATION_TIME}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        urls.push(data.data.url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return urls;
};