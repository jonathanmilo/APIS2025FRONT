import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategorias } from "@src/contexts/CategoryContext.jsx";
import { CategoriasValidas } from "../Vender/components/CategoriasValidas.jsx";
import { fetchProductById, updateProduct } from "@src/api/products.js";
import { useValidacion } from "@src/contexts/AuthContext.jsx";

import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

export function EditarProducto() {
  const { id } = useParams();
  const { categorias } = useCategorias();
  const navigate = useNavigate();
  const { user } = useValidacion();

  // Estados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subcategorias, setSubcategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    userId: "",
    title: "",
    images: [{ url: "", isCover: true }],
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    subcategoryIds: [],
    discountPercentage: "",
    isFeatured: false,
  });

  // Cargar datos del producto
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchProductById(id)
        .then((response) => {
          const product = response.data;
          
          // Verificar que el producto pertenece al usuario actual
          if (product.userId !== user.id.toString()) {
            setError("No tienes permiso para editar este producto");
            setLoading(false);
            return;
          }
          
          setFormData(product);
          setCategoria(product.categoryId);
          setSubcategorias(product.subcategoryIds);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al cargar el producto:", err);
          setError("No se pudo cargar el producto. Intenta nuevamente.");
          setLoading(false);
        });
    }
  }, [id, user?.id]);

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
  const handleImageChange = (index, e) => {
    const newImages = [...formData.images];
    newImages[index] = { ...newImages[index], url: e.target.value };
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  // Añadir nueva imagen
  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { url: "", isCover: false }],
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
    if (formData.images.some((img) => !img.url.trim()))
      return "Todas las imágenes deben tener URL";
    return null;
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);
    updateProduct(formData.id, formData)
      .then(() => {
        alert("Producto actualizado exitosamente!");
        navigate("/mi-perfil");
      })
      .catch((err) => {
        console.error("Error al actualizar el producto:", err);
        setError("No se pudo actualizar el producto. Intenta nuevamente.");
        setLoading(false);
      });
  };

  if (loading && Object.keys(formData).length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ m: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/mi-perfil")}
          sx={{ mt: 2 }}
        >
          Volver a Mi Perfil
        </Button>
      </Box>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="m-5 bg-white p-5 lg:mx-50 shadow-lg"
    >
      <h1 className="text-black uppercase text-xl text-center mb-5">
        Editar producto
      </h1>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        {/* Sección de información básica */}

        <Typography variant="h6" gutterBottom color="black">
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
          <Typography variant="h6" gutterBottom color="black">
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
                <Grid>
                  <TextField
                    fullWidth
                    label={`URL de la imagen ${index + 1}`}
                    value={image.url}
                    onChange={(e) => handleImageChange(index, e)}
                    required
                  />
                </Grid>
                <Grid>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={image.isCover}
                        onChange={() => setCoverImage(index)}
                        color="primary"
                      />
                    }
                    label="Portada"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "black",
                      },
                    }}
                  />
                </Grid>
                <Grid>
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
          <Typography variant="h6" gutterBottom color="black">
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
          <Button
            variant="outlined"
            onClick={() => navigate("/mi-perfil")}
            sx={{ px: 4 }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 4 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Guardar cambios"}
          </Button>
        </Box>
      </Grid>
    </form>
  );
}

export default EditarProducto; 