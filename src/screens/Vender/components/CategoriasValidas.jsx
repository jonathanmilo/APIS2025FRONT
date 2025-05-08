import React, { useState, useEffect } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Stack
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

export function CategoriasValidas({ 
  categorias,
  seleccionada,
  subSeleccionadas,
  initialCategory = "",
  initialSubcategories = []
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategories, setSelectedSubcategories] = useState(initialSubcategories);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Notificar cambios en las selecciones
  useEffect(() => {
    if (seleccionada) {
      seleccionada(selectedCategory);
    }
  }, [selectedCategory, seleccionada]);

  useEffect(() => {
    if (subSeleccionadas) {
      subSeleccionadas(selectedSubcategories);
    }
  }, [selectedSubcategories, subSeleccionadas]);

  const handleCategoryChange = (categoryId) => {
    if (selectedCategory === categoryId) {
      // Deseleccionar categoría
      setSelectedCategory("");
      // Limpiar subcategorías asociadas
      setSelectedSubcategories([]);
    } else {
      // Seleccionar nueva categoría
      setSelectedCategory(categoryId);
      // Mantener solo las subcategorías que pertenecen a la nueva categoría
      const newCategory = categorias.find(c => c.id === categoryId);
      const validSubcategories = selectedSubcategories.filter(subId => 
        newCategory.subcategories.some(sub => sub.id === subId)
      );
      setSelectedSubcategories(validSubcategories);
    }
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategoryId)
        ? prev.filter(id => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const handleExpandCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const hasSubcategories = (category) => 
    category.subcategories && category.subcategories.length > 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
        Selecciona las categorías y subcategorías de tu producto
      </Typography>

      {/* Barra horizontal de categorías */}
      <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap' }}>
        {categorias.map((categoria) => (
          <Box key={categoria.id} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCategory === categoria.id}
                  onChange={() => handleCategoryChange(categoria.id)}
                  color="primary"
                />
              }
              label={categoria.name}
            />
            {selectedCategory === categoria.id && hasSubcategories(categoria) && (
              <Chip 
                label="Ver subcategorías" 
                size="small" 
                onClick={() => handleExpandCategory(categoria.id)}
                sx={{ ml: 1 }}
                variant="outlined"
              />
            )}
          </Box>
        ))}
      </Stack>

      {/* Subcategorías en acordeones */}
      {categorias.map((categoria) => (
        selectedCategory === categoria.id && hasSubcategories(categoria) && (
          <Accordion 
            key={`accordion-${categoria.id}`}
            expanded={expandedCategory === categoria.id}
            onChange={() => handleExpandCategory(categoria.id)}
            sx={{ mb: 1 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'bold' }}>{categoria.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {categoria.subcategories.map((subcategoria) => (
                  <FormControlLabel
                    key={subcategoria.id}
                    control={
                      <Checkbox
                        checked={selectedSubcategories.includes(subcategoria.id)}
                        onChange={() => handleSubcategoryChange(subcategoria.id)}
                        color="secondary"
                      />
                    }
                    label={subcategoria.name}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )
      ))}

      {/* Muestra selecciones actuales */}
      {(selectedCategory || selectedSubcategories.length > 0) && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle1" gutterBottom>
            Selecciones actuales:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
            {selectedCategory && (
              <Chip 
                key={`selected-cat-${selectedCategory}`} 
                label={categorias.find(c => c.id === selectedCategory)?.name || ''} 
                color="primary" 
                variant="outlined"
                sx={{ mb: 1 }}
              />
            )}
            {selectedSubcategories.map(subId => {
              const subcat = categorias
                .flatMap(c => c.subcategories || [])
                .find(s => s.id === subId);
              return (
                <Chip 
                  key={`selected-sub-${subId}`} 
                  label={subcat?.name || ''} 
                  color="secondary" 
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
}

export default CategoriasValidas