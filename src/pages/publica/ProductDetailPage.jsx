import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart } from 'react-icons/fa';
import '../../styles/product.css'

const ProductDetailPage = () => {
    const { id } = useParams();
    const { getProduct, updateProduct } = useProducts();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProduct(id);
                setProduct(productData);
                if (productData.images && productData.images.length > 0) {
                    setMainImage(productData.images[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, getProduct]);

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="star" />);
            } else if (i === fullStars + 1 && halfStar) {
                stars.push(<FaStarHalfAlt key={i} className="star" />);
            } else {
                stars.push(<FaRegStar key={i} className="star" />);
            }
        }
        
        return stars;
    };

    const handleRatingClick = (rating) => {
        setUserRating(rating);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (userRating === 0) {
            alert('Por favor seleccione una calificación');
            return;
        }
        
        try {
            // Create new review object
            const newReview = {
                rating: userRating,
                comment: userComment,
                createdAt: new Date()
            };
            
            // Create updated product with new review
            const updatedProduct = {
                ...product,
                reviews: [...product.reviews, newReview],
                // Recalculate average rating
                rating: (product.reviews.reduce((sum, review) => sum + review.rating, 0) + userRating) / 
                        (product.reviews.length + 1)
            };
            
            // Update product with new review
            await updateProduct(id, updatedProduct);
            
            // Refresh product data
            const refreshedProduct = await getProduct(id);
            setProduct(refreshedProduct);
            
            // Reset form
            setUserRating(0);
            setUserComment('');
            
            alert('¡Gracias por su reseña!');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Error al enviar la reseña. Por favor intente de nuevo.');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    if (loading) {
        return (
            <div className="product-detail-container">
                <div className="loading">Cargando producto...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-container">
                <div className="product-detail-card">
                    <h2>Producto no encontrado</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-container txt">
            <div className="product-detail-card">
                <div className="product-main-section">
                    {/* Sección de imágenes */}
                    <div className="product-images-container">
                        <img 
                            src={mainImage || product.images[0] || '/placeholder-image.jpg'} 
                            alt={product.name} 
                            className="product-main-image" 
                        />
                        
                        {product.images && product.images.length > 1 && (
                            <div className="product-image-gallery">
                                {product.images.map((image, index) => (
                                    <img 
                                        key={index}
                                        src={image} 
                                        alt={`${product.name} - imagen ${index + 1}`}
                                        className={`product-thumbnail ${mainImage === image ? 'active' : ''}`}
                                        onClick={() => handleImageClick(image)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Sección de información */}
                    <div className="product-info">
                        <h1 className="product-title h1-form">{product.name}</h1>
                        
                        <div className="product-rating">
                            <div className="stars">
                                {renderStars(product.rating)}
                            </div>
                            <span className="rating-count">
                                {product.reviews.length} {product.reviews.length === 1 ? 'reseña' : 'reseñas'}
                            </span>
                        </div>
                        
                        <p className="product-description">{product.description}</p>
                        
                        <div className="product-price">${product.price.toFixed(2)}</div>
                        
                        <div className="product-stock">
                            <span className={`stock-indicator ${
                                product.stock > 10 ? 'in-stock' : 
                                product.stock > 0 ? 'low-stock' : 
                                'out-of-stock'
                            }`}></span>
                            {product.stock > 10
                                ? `En stock (${product.stock} disponibles)`
                                : product.stock > 0
                                ? `¡Pocas unidades disponibles! (${product.stock})`
                                : 'Agotado'
                            }
                        </div>
                        
                        <div className="product-details">
                            {product.category && (
                                <span className="detail-item">
                                    Categoría: {product.category.name || 'Categoría'}
                                </span>
                            )}
                            {product.marca && (
                                <span className="detail-item">
                                    Marca: {product.marca.name || 'Marca'}
                                </span>
                            )}
                        </div>
                        
                        <div className="button-group">
                            <button 
                                className="cart-button txt"
                                disabled={product.stock === 0}
                                onClick={() => {/* Función para agregar al carrito */}}
                            >
                                <FaShoppingCart /> Agregar al carrito
                            </button>
                            <button 
                                className="buy-button txt"
                                disabled={product.stock === 0}
                                onClick={() => {/* Función para comprar ahora */}}
                            >
                                Comprar ahora
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Sección de reseñas */}
                <div className="reviews-section">
                    <h2 className="reviews-title">Reseñas de clientes</h2>
                    
                    <div className="reviews-summary">
                        <div className="average-rating">
                            {product.rating.toFixed(1)}
                        </div>
                        <div className="reviews-count">
                            Basado en {product.reviews.length} {product.reviews.length === 1 ? 'reseña' : 'reseñas'}
                        </div>
                    </div>
                    
                    <div className="reviews-list">
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.map((review, index) => (
                                <div key={index} className="review-item">
                                    <div className="review-header">
                                        <span className="reviewer-name">
                                            {review.user ? review.user.name : 'Usuario'}
                                        </span>
                                        <span className="review-date">
                                            {formatDate(review.createdAt)}
                                        </span>
                                    </div>
                                    <div className="review-rating">
                                        {renderStars(review.rating)}
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p>Este producto aún no tiene reseñas. ¡Sé el primero en opinar!</p>
                        )}
                    </div>
                    
                    <div className="write-review">
                        <h3 className="write-review-title">Escribir una reseña</h3>
                        <form className="review-form" onSubmit={handleSubmitReview}>
                            <div className="rating-input">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span 
                                        key={star}
                                        className={`rating-star ${userRating >= star ? 'active' : ''}`}
                                        onClick={() => handleRatingClick(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <textarea
                                className="comment-input"
                                placeholder="Comparte tu opinión sobre este producto..."
                                value={userComment}
                                onChange={(e) => setUserComment(e.target.value)}
                                required
                            />
                            <button type="submit" className="submit-review">
                                Enviar reseña
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;

