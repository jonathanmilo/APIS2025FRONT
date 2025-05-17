import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneUploader = ({ onUpload, fieldName, currentFile }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!currentFile) return;

    const objectUrl = URL.createObjectURL(currentFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [currentFile]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(fieldName, acceptedFiles[0]);
      }
    },
    [onUpload, fieldName]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border border-dashed text-black dark:text-white hover:text-primary border-gray-400 p-5 mb-2 text-center rounded-xl cursor-pointer hover:border-primary"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Soltar imagen acá...</p>
      ) : (
        <p>Arrastra o haz click para seleccionar una imagen</p>
      )}

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Vista previa"
          className="mx-auto mt-2 h-50 w-50 object-cover rounded-full"
        />
      )}
    </div>
  );
};

export default DropzoneUploader;
