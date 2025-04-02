import React from "react";
import { Link } from "react-router-dom";
import "./../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <div className="footer-logo">
                <i className="fas fa-mountain"></i>
                <h3>AlpineGear</h3>
              </div>
              <p>
                Equipamiento premium para aventureros al aire libre desde 2015. Especializados en productos de alta calidad para senderismo, escalada y camping con asesoramiento experto.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            
            <div className="footer-column">
              <h3>Enlaces Rápidos</h3>
              <ul className="footer-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/products">Productos</Link></li>
                <li><Link to="/about">Sobre Nosotros</Link></li>
                <li><Link to="/blog">Blog de Aventuras</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Categorías</h3>
              <ul className="footer-links">
                <li><Link to="/category/hiking">Senderismo</Link></li>
                <li><Link to="/category/climbing">Escalada</Link></li>
                <li><Link to="/category/camping">Camping</Link></li>
                <li><Link to="/category/clothing">Ropa Técnica</Link></li>
                <li><Link to="/category/footwear">Calzado</Link></li>
                <li><Link to="/category/accessories">Accesorios</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Newsletter</h3>
              <p>
                Suscríbete para recibir ofertas exclusivas, consejos para tus aventuras y novedades sobre nuestros productos.
              </p>
              <form className="newsletter-form">
                <div className="newsletter-input-group">
                  <input type="email" placeholder="Tu correo electrónico" required />
                  <button type="submit"><i className="fas fa-paper-plane"></i></button>
                </div>
                <div className="newsletter-consent">
                  <input type="checkbox" id="consent" required />
                  <label htmlFor="consent">Acepto recibir comunicaciones comerciales</label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {new Date().getFullYear()} AlpineGear. Todos los derechos reservados.
            </p>
            <ul className="footer-legal">
              <li><Link to="/privacy">Privacidad</Link></li>
              <li><Link to="/terms">Términos</Link></li>
              <li><Link to="/cookies">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;