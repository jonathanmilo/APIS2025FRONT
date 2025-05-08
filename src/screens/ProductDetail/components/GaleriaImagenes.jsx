import { useState, useEffect } from "react";

const GaleriaImagenes = ({ images }) => {
  const [imagenPrincipal, setImagenPrincipal] = useState(
    images.find((img) => img.isCover) || images[0]
  );

  useEffect(() => {
    setImagenPrincipal(images.find((img) => img.isCover) || images[0]);
  }, [images]);

  return (
    <div className="flex flex-row items-start justify-center gap-4">
      {/* Miniaturas */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setImagenPrincipal(img)}
            className={`border-2 ${
              imagenPrincipal.url === img.url
                ? "border-brand-main"
                : "border-transparent"
            }`}
          >
            <img
              src={img.url}
              alt={`Miniatura ${index}`}
              className="w-20 h-16 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Imagen Principal */}
      <div className="w-[400px] h-[250px] md:h-[400px] lg:h-[400px] xl:h-[450px] bg-white flex items-start justify-center">
        <img
          src={imagenPrincipal.url}
          alt="Imagen Principal"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default GaleriaImagenes;
