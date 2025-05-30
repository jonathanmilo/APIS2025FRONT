import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCategorias } from "@src/contexts/CategoryContext.jsx";
import { CategoriasValidas } from "./components/CategoriasValidas.jsx";
import { useProductos } from "../../contexts/ProductContext.jsx";
import { useValidacion } from "@src/contexts/AuthContext.jsx";
import { uploadImages } from "@src/utils/uploadImages";
import talleres from "/sounds/talleres.mp3";
import FileInputWithPreview from "./components/FileInputWithPreview.jsx";

import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Box,
} from "@mui/material";

export function Vender() {
  const { categorias } = useCategorias();
  const navigate = useNavigate();
  const { crearProducto } = useProductos();
  const [imagenes, setImagenes] = useState([]);

  // Estados para categorías y subcategorías
  const [subcategorias, setSubcategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const { user } = useValidacion();

  //audio
  const audioRef = useRef(null);
  function sonidito() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }
  // Estado del formulario
  const [formData, setFormData] = useState({
    id: (Math.floor(Math.random() * 900) + 101).toString(),
    userId: user.id.toString(),
    title: "",
    images: [{ file: null, isCover: true }],
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    subcategoryIds: [],
    discountPercentage: "",
    isFeatured: false,
  });

  // Actualizar formData cuando cambian las categorías
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      categoryId: categoria,
      subcategoryIds: subcategorias,
    }));
  }, [categoria, subcategorias]);

  // Manejador genérico para inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Manejador para imágenes
  const handleImageUpload = (index, file) => {
    const newImages = [...formData.images];
    newImages[index] = { ...newImages[index], file };
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  // Añadir nueva imagen
  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { file: null, isCover: false }],
    }));
  };

  // Eliminar imagen
  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    // Asegurar que al menos quede una imagen marcada como principal
    if (newImages.length > 0 && !newImages.some((img) => img.isCover)) {
      newImages[0].isCover = true;
    }
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  // Marcar como imagen principal
  const setCoverImage = (index) => {
    const newImages = formData.images.map((img, i) => ({
      ...img,
      isCover: i === index,
    }));
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  // Validar formulario antes de enviar
  const validateForm = () => {
    if (!formData.title.trim()) return "El título es requerido";
    if (!formData.description.trim()) return "La descripción es requerida";
    if (!formData.price || isNaN(formData.price)) return "Precio inválido";
    if (!formData.stock || isNaN(formData.stock)) return "Stock inválido";
    if (!formData.categoryId) return "Debes seleccionar una categoría";
    if (formData.images.some((img) => !img.file))
      return "Todas las imágenes deben estar cargadas";
    return null;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    try {
      // Subir imágenes al servidor
      const imageFiles = formData.images.map((img) => img.file);
      const uploadedUrls = await uploadImages(imageFiles);

      // Reemplazar en formData
      const finalImages = uploadedUrls.map((url, i) => ({
        url,
        isCover: formData.images[i].isCover,
      }));

      const finalFormData = { ...formData, images: finalImages };

      await crearProducto(user.id.toString(), finalFormData);

      sonidito();
      alert("Producto publicado exitosamente!");
      navigate("/mi-perfil");
    } catch (err) {
      console.error("Error al crear el producto:", err);
      alert("No se pudo crear el producto. Intenta nuevamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-5 bg-white dark:bg-black p-5 lg:mx-50 shadow-lg"
    >
      <h1 className="text-black dark:text-white uppercase text-xl text-center mb-5">
        Crear publicación
      </h1>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        {/* Sección de información básica */}

        <Typography variant="h6" gutterBottom color="text.primary">
          Datos del producto
        </Typography>

        <TextField
          fullWidth
          label="Título del producto"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          required
        />

        {/* Sección de precios y stock */}

        <TextField
          fullWidth
          label="Precio ($)"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          required
        />

        <TextField
          fullWidth
          label="Descuento (%)"
          name="discountPercentage"
          type="number"
          value={formData.discountPercentage}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          label="Stock disponible"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleInputChange}
          required
        />

        {/* Sección de imágenes */}

        <Grid>
          <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
            Imágenes del producto
          </Typography>
          <Box sx={{ mb: 2 }}>
            {formData.images.map((image, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Grid item xs={12} md={6}>
                  <FileInputWithPreview
                    onUpload={handleImageUpload}
                    file={image.file}
                    index={index}
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={image.isCover}
                        onChange={() => setCoverImage(index)}
                        color="primary"
                      />
                    }
                    label="Portada"
                  />
                </Grid>
                <Grid item>
                  {formData.images.length > 1 && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeImageField(index)}
                    >
                      Eliminar
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}
          </Box>
          <Button variant="contained" onClick={addImageField} sx={{ mt: 1 }}>
            Añadir otra imagen
          </Button>
        </Grid>

        {/* Sección de categorías */}
        <Grid>
          <Typography variant="h6" gutterBottom color="text.primary">
            Categorías
          </Typography>
          <CategoriasValidas
            categorias={categorias}
            seleccionada={setCategoria}
            subSeleccionadas={setSubcategorias}
            initialCategory={formData.categoryId}
            initialSubcategories={formData.subcategoryIds}
          />
        </Grid>
      </Grid>

      {/* Botones de acción */}

      <Grid>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <audio ref={audioRef} src={talleres} />
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ px: 4 }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 4 }}
            onClick={sonidito}
          >
            Publicar
          </Button>
        </Box>
      </Grid>
    </form>
  );
}

export default Vender;
