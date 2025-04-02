import { createContext, useContext, useState } from "react";
import {
  getProductsRequest,
  getProductRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../api/products";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Obtener todos los productos
  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener un producto por su ID
  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Crear un nuevo producto
  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);
      if (res.status === 201) {
        setProducts([...products, res.data]); // Agregar el nuevo producto al estado
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Actualizar un producto existente
  const updateProduct = async (id, product) => {
    try {
      const res = await updateProductRequest(id, product);
      if (res.status === 200) {
        setProducts(
          products.map((p) => (p._id === id ? { ...p, ...res.data } : p))
        ); // Actualizar el producto en el estado
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Eliminar un producto
  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status === 204) {
        setProducts(products.filter((product) => product._id !== id)); // Eliminar el producto del estado
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

