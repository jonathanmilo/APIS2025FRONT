import { UsuarioProvider } from "./UserContext";
import { ValidacionProvider } from "./AuthContext";
import { CarritoProvider } from "./CartContext";
import { ProductosProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";
import { OrdersProvider } from "./OrderContext";

export function AppContextProvider({ children }) {
  return (
    <UsuarioProvider>
      <ValidacionProvider>
        <CarritoProvider>
          <ProductosProvider>
            <OrdersProvider>
              <CategoryProvider>{children}</CategoryProvider>
            </OrdersProvider>
          </ProductosProvider>
        </CarritoProvider>
      </ValidacionProvider>
    </UsuarioProvider>
  );
}
