import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>La Aventura <span>Comienza Aquí</span></h1>
            <p>Equipamiento premium para excursionistas, escaladores y entusiastas del aire libre</p>
            <div className="hero-buttons">
              <Link to="/products" className="btn-primary">Ver Colección</Link>
              <Link to="/about" className="btn-secondary">Nuestra Historia</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="container">
          <div className="section-header">
            <h2>Explora Por Categoría</h2>
            <p>Encuentra el equipo perfecto para tu próxima aventura</p>
          </div>
          
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image hiking"></div>
              <h3>Senderismo</h3>
              <p>Equipo listo para rutas de día y excursiones con mochila</p>
              <Link to="/category/hiking" className="category-link">Explorar <i className="fas fa-arrow-right"></i></Link>
            </div>
            
            <div className="category-card">
              <div className="category-image climbing"></div>
              <h3>Escalada</h3>
              <p>Equipamiento para escalada en roca, boulder y montañismo</p>
              <Link to="/category/climbing" className="category-link">Explorar <i className="fas fa-arrow-right"></i></Link>
            </div>
            
            <div className="category-card">
              <div className="category-image camping"></div>
              <h3>Camping</h3>
              <p>Tiendas, sacos de dormir y equipo de cocina para exteriores</p>
              <Link to="/category/camping" className="category-link">Explorar <i className="fas fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="new-arrivals">
        <div className="container">
          <div className="section-header">
            <h2>Novedades</h2>
            <p>Las últimas adiciones a nuestra colección</p>
            <Link to="/products/new" className="view-all">Ver Todo</Link>
          </div>
          
          <div className="products-slider">
            <div className="product-card">
              <div className="product-badge">Nuevo</div>
              <div className="product-image">
                <img src="/api/placeholder/400/500" alt="Producto" />
              </div>
              <div className="product-info">
                <h3>Mochila Alpine Pro</h3>
                <div className="product-price">$2,499 MXN</div>
                <button className="add-to-cart">Añadir al Carrito</button>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-badge">Nuevo</div>
              <div className="product-image">
                <img src="/api/placeholder/400/500" alt="Producto" />
              </div>
              <div className="product-info">
                <h3>Chaqueta Trekker Gore-Tex</h3>
                <div className="product-price">$4,699 MXN</div>
                <button className="add-to-cart">Añadir al Carrito</button>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-badge">Nuevo</div>
              <div className="product-image">
                <img src="/api/placeholder/400/500" alt="Producto" />
              </div>
              <div className="product-info">
                <h3>Botas Summit Trail</h3>
                <div className="product-price">$3,299 MXN</div>
                <button className="add-to-cart">Añadir al Carrito</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3>Envío Gratis</h3>
              <p>En pedidos mayores a $1,500</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-undo"></i>
              </div>
              <h3>Devoluciones 30 Días</h3>
              <p>Política de devolución sin complicaciones</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Pago Seguro</h3>
              <p>Transacciones protegidas</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Soporte 24/7</h3>
              <p>Estamos aquí para ayudarte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Únete a Nuestra Comunidad</h2>
            <p>Suscríbete a nuestro boletín para ofertas exclusivas, consejos de aventura y anuncios de nuevos productos</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Tu dirección de correo" required />
              <button type="submit">Suscribirse</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;