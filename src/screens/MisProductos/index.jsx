import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  fetchUserProducts, 
  deleteProduct 
} from "@src/api/products.js";
import { useValidacion } from "@src/contexts/AuthContext.jsx";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert
} from "@mui/material";

export function MisProductos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { user } = useValidacion();
  const navigate = useNavigate();

  // Cargar los productos del usuario
  useEffect(() => {
    if (user && user.id) {
      setLoading(true);
      fetchUserProducts(user.id)
        .then(response => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error al cargar los productos:", err);
          setError("No se pudieron cargar tus productos. Intenta nuevamente.");
          setLoading(false);
        });
    }
  }, [user]);

  // Abrir diálogo de confirmación para eliminar
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  // Cerrar diálogo de confirmación
  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  // Confirmar y eliminar producto
  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setLoading(true);
      deleteProduct(selectedProduct.id)
        .then(() => {
          setProducts(products.filter(p => p.id !== selectedProduct.id));
          setDeleteDialogOpen(false);
          setSelectedProduct(null);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error al eliminar el producto:", err);
          setError("No se pudo eliminar el producto. Intenta nuevamente.");
          setLoading(false);
          setDeleteDialogOpen(false);
        });
    }
  };

  // Editar producto
  const handleEditProduct = (productId) => {
    navigate(`/editar-producto/${productId}`);
  };

  if (loading && products.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ m: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" color="text.primary">
          Mis Productos
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/vender')}
        >
          Publicar Nuevo Producto
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {products.length === 0 && !loading ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tienes productos publicados aún
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/vender')}
            sx={{ mt: 2 }}
          >
            Publicar tu primer producto
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images?.find(img => img.isCover)?.url || product.images?.[0]?.url || 'https://via.placeholder.com/200'}
                  alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.description.length > 100 
                      ? `${product.description.substring(0, 100)}...` 
                      : product.description}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Editar
                  </Button>
                  <Button 
                    size="small" 
                    color="error"
                    onClick={() => handleDeleteClick(product)}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar "{selectedProduct?.title}"? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MisProductos; 