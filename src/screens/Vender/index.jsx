import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategorias } from "../../contexts/CategoryContext.jsx";
import { CategoriasValidas } from './components/CategoriasValidas.jsx';
import { createProduct } from "../../api/products.js";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Box
} from '@mui/material';

export function Vender() {
    const { categorias } = useCategorias();
    const navigate = useNavigate();
    
    // Estados para categorías y subcategorías
    const [subcategorias, setSubcategorias] = useState([]);
    const [categoria, setCategoria] = useState("");
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        title: "",
        images: [{"url": "", "isCover": true}],
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
        setFormData(prev => ({
            ...prev,
            categoryId: categoria,
            subcategoryIds: subcategorias
        }));
    }, [categoria, subcategorias]);

    // Manejador genérico para inputs
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Manejador para imágenes
    const handleImageChange = (index, e) => {
        const newImages = [...formData.images];
        newImages[index] = { ...newImages[index], url: e.target.value };
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    // Añadir nueva imagen
    const addImageField = () => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, { "url": "", "isCover": false }]
        }));
    };

    // Eliminar imagen
    const removeImageField = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        // Asegurar que al menos quede una imagen marcada como principal
        if (newImages.length > 0 && !newImages.some(img => img.isCover)) {
            newImages[0].isCover = true;
        }
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    // Marcar como imagen principal
    const setCoverImage = (index) => {
        const newImages = formData.images.map((img, i) => ({
            ...img,
            isCover: i === index
        }));
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    // Validar formulario antes de enviar
    const validateForm = () => {
        if (!formData.title.trim()) return "El título es requerido";
        if (!formData.description.trim()) return "La descripción es requerida";
        if (!formData.price || isNaN(formData.price)) return "Precio inválido";
        if (!formData.stock || isNaN(formData.stock)) return "Stock inválido";
        if (!formData.categoryId) return "Debes seleccionar una categoría";
        if (formData.images.some(img => !img.url.trim())) return "Todas las imágenes deben tener URL";
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
        
        // Aquí iría la lógica para enviar los datos al servidor
        
        //createProduct(formData)
        console.log("Datos del producto a publicar:", formData);
        alert("Producto publicado exitosamente!");
        navigate('/'); // Redirigir al home después de publicar
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: 'auto', my: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                Publicar nuevo producto
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Sección de información básica */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Título del producto"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
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
                    </Grid>

                    {/* Sección de precios y stock */}
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Precio ($)"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            inputProps={{ min: 0, step: 0.01 }}
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Descuento (%)"
                            name="discountPercentage"
                            type="number"
                            value={formData.discountPercentage}
                            onChange={handleInputChange}
                            inputProps={{ min: 0, max: 100 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Stock disponible"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleInputChange}
                            inputProps={{ min: 0 }}
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleInputChange}
                                    color="primary"
                                />
                            }
                            label="Producto destacado"
                        />
                    </Grid>

                    {/* Sección de imágenes */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Imágenes del producto</Typography>
                        <Box sx={{ mb: 2 }}>
                            {formData.images.map((image, index) => (
                                <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                                    <Grid item xs={8}>
                                        <TextField
                                            fullWidth
                                            label={`URL de la imagen ${index + 1}`}
                                            value={image.url}
                                            onChange={(e) => handleImageChange(index, e)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={image.isCover}
                                                    onChange={() => setCoverImage(index)}
                                                    color="primary"
                                                />
                                            }
                                            label="Principal"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
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
                        <Button 
                            variant="contained" 
                            onClick={addImageField}
                            sx={{ mt: 1 }}
                        >
                            Añadir otra imagen
                        </Button>
                    </Grid>

                    {/* Sección de categorías */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Categorías</Typography>
                        <CategoriasValidas 
                            categorias={categorias}
                            seleccionada={setCategoria}
                            subSeleccionadas={setSubcategorias}
                            initialCategory={formData.categoryId}
                            initialSubcategories={formData.subcategoryIds}
                        />
                    </Grid>

                    {/* Botones de acción */}
                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
                            >
                                Publicar producto
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default Vender;