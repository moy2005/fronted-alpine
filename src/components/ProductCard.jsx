import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "../styles/products.css";

function ProductCard({ product }) {
    const { deleteProduct } = useProducts();

    if (!product) {
        return <div className="loading">Cargando...</div>;
    }

    const { name, price, image, _id } = product;

    const handleDelete = async () => {
        try {
            if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                await deleteProduct(_id);
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    return (
        <div className="product-card">
            <img 
                src="https://th.bing.com/th/id/OIP.4-CKVRGw3cKZs7mk9N_PPwHaHa?rs=1&pid=ImgDetMain" 
                alt={name} 
                className="product-image" 
            />
            <div className="product-info">
                <h2 className="product-title">{name}</h2>
                <p className="product-price">Precio: ${price}</p>
                <div className="product-actions">
                    <Link 
                        to={`/products/${_id}`} 
                        className="view-more-btn"
                    >
                        Ver más
                    </Link>
                    <Link 
                        to={`/products/update/${_id}`} 
                        className="update-btn"
                    >
                        Actualizar
                    </Link>
                    <button 
                        onClick={handleDelete}
                        className="delete-btn"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
