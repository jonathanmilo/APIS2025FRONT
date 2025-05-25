import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function FileInputWithPreview({ index, file, onUpload }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onUpload(index, e.target.files[0]);
    }
  };

  return (
    <div className="text-center">
      {!previewUrl && (
        <Button variant="outlined" component="label">
          Subir imagen
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
      )}

      {previewUrl && (
        <img
          src={previewUrl}
          alt={`Preview ${index}`}
          className="mx-auto mt-2 h-32 w-32 object-cover"
        />
      )}
    </div>
  );
}
