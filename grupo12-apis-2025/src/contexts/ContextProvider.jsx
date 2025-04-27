import { UsuarioProvider } from "./UserContext";
import { AuthProvider } from "./AuthContext";
import { CarritoProvider } from "./CartContext";
import { ProductosProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";
import { OrdersProvider } from "./OrderContext";

export function AppContextProvider({ children }) {
  return (
    <UsuarioProvider>
      <AuthProvider>
        <CarritoProvider>
          <ProductosProvider>
            <OrdersProvider>
              <CategoryProvider>{children}</CategoryProvider>
            </OrdersProvider>
          </ProductosProvider>
        </CarritoProvider>
      </AuthProvider>
    </UsuarioProvider>
  );
}
