import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import '../../styles/tableProducts.css';

function ProductTable() {
  const { products, deleteProduct, getProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getProducts();
        setError(null);
      } catch (err) {
        setError("Hubo un error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [getProducts]);

  if (loading) {
    return (
      <div className="loading">Cargando productos...</div>
    );
  }

  if (error) {
    return (
      <div className="loading">Cargando</div>
    );
  }


  if (!products || products.length === 0) {
    return <div className="loading">No hay productos disponibles...</div>;
  }


  const handleDelete = async (id) => {
    try {
      if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        await deleteProduct(id);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="table-container">
      <Link to="/products/create" className="create-btn">
        Crear Producto
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Marca</th>
            <th>Valoración</th>
            <th>Reseñas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                {product.category
                  ? (typeof product.category === "object" && product.category.name
                    ? product.category.name
                    : "No especificada")
                  : "No especificada"}
              </td>
              <td>
                {product.marca
                  ? (typeof product.marca === "object" && product.marca.name
                    ? product.marca.name
                    : "No especificada")
                  : "No especificada"}
              </td>
              <td>{product.rating || 0} ⭐</td>
              <td>{product.reviews ? product.reviews.length : 0}</td>
              <td className="product-actions">
                <Link
                  to={`/products/update/${product._id}`}
                  className="update-btn"
                >
                  Actualizar
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
