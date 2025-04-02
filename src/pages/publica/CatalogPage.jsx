import React, { useEffect } from "react";
import { useProducts } from "../../context/ProductContext"; 
import ProductsGrid from "./ProductsGrid"; 
import "../../styles/products.css";

function CatalogPage() {
  const { getProducts, products, loading } = useProducts();

  useEffect(() => {
    getProducts(); // Llama a la función para obtener productos
  }, [getProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center p-6">
       <h1 className="catalog-title h1-form">Catalogo de Productos</h1>
        <div className="loading">Cargando productos...</div>
      </div>
    );
  }

  // Si no hay productos
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center p-6">
         <h1 className="catalog-title h1-form">Catalogo de Productos</h1>
        <h2 className="tasks text-red-400">No hay productos disponibles</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
       <h1 className="catalog-title h1-form">Productos</h1>
      <ProductsGrid products={products} />
    </div>
  );
}

export default CatalogPage;

