import { createContext, useContext, useEffect, useState } from "react";
import { useValidacion } from "./AuthContext";

const ProductContext = createContext();

export function useProductos() {
  return useContext(ProductContext);
}

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
    const { user,token } = useValidacion();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductos = async () => {
    try {
      const prods= await fetch(`http://localhost:8080/products`, {
      
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
       //   Authorization: 'Bearer '+token, // Asegúrate de que el token esté en el contexto de usuario          

        },});
      
      if (prods.ok) {
        const data = await prods.json();
        setProductos(data);
      }else if (prods.status === 404) {
      // Manejar el caso en que NO haya productos
      console.warn(`No hay productos `);
     
    } else {
      console.error(`Error inesperado al obtener productos. Código: ${response.status}`);
    }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshProductos = () => {
    getProductos();
  };

  const eliminarProducto = async (id) => {
    try {
       const eliminar= await fetch(`http://localhost:8080/products/${id}` ,{
         method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+token, // Asegúrate de que el token esté en el contexto de usuario          

        }
      })
      if(eliminar.ok){

        refreshProductos();
        return { success: true };
      }
      else if(eliminar.status===404){
        console.error("error en eliminar producto: ",eliminar)
      }else{
        console.error("error en eliminar producto: ",eliminar)

      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return { success: false, error };
    }
  };


  const crearProducto = async (userId, nuevoProducto) => {
    if (!userId) throw new Error("No hay usuario logueado");
    try {
      const crear= await fetch(`http://localhost:8080/products/`,{
         method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+token, // Asegúrate de que el token esté en el contexto de usuario          
          body:JSON.stringify(nuevoProducto)
        }

      })
      if(crear.ok()){
        refreshProductos();
        return{succes:true}

      }else if(crear.status===404){
        console.error("error 404 en crear producto: ",crear);
      }
      else{
        console.log("error ",crear)
      }

    } catch (err) {
      throw err;
    }
  };

  const actualizarProducto = async (id, data) => {
    try {
      const actualizar= await fetch(`http://localhost:8080/products/${id}`,{
         method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+token, // Asegúrate de que el token esté en el contexto de usuario          
          body:JSON.stringify(data)
        }
      })
      if( actualizar.ok()){
        refreshProductos();
        return {success:true}

      }else if( actualizar.status===404){
        console.error("error 404 al actualizar el producto",actualizar)
      }
      else{
        console.log("error en actualizar producto",actualizar)
      }
    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productos,
        loading,
        error,
        eliminarProducto,
        actualizarProducto,
        crearProducto,
        refreshProductos,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
