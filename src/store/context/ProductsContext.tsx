import React, { createContext, useContext, useReducer, Dispatch, useEffect, useCallback } from "react";
import { ProductItem } from "../type";
import { getProducts } from "api/product";
import { productsReducer, ProductsActionType } from "store/reducers/productReducer";

interface ProductsContextType {
  products: ProductItem[];
  dispatch: Dispatch<ProductsActionType>;
  fetchProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(productsReducer, { products: [] });

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: data });
    } catch (error) {
      console.log(error)
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider value={{ products: state.products, dispatch, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProductsContext = (): ProductsContextType => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProductsContext must be used within a ProductsProvider");
  }

  return context;
};

export { ProductsProvider, useProductsContext };