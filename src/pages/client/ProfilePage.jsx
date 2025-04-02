import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { FaUser, FaShoppingBag, FaHeart, FaCreditCard, FaMapMarkerAlt, FaBell, FaSignOutAlt, FaEnvelope, FaPhone, FaKey, FaEdit } from 'react-icons/fa';
import './../../styles/profilePage.css';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();
  
  // Datos de ejemplo para pedidos y lista de deseos
  const recentOrders = [
    { id: "ORD-7851", date: "15 Abril, 2025", status: "Entregado", total: "129.99€" },
    { id: "ORD-7632", date: "2 Abril, 2025", status: "En camino", total: "84.50€" },
    { id: "ORD-7523", date: "18 Marzo, 2025", status: "Entregado", total: "215.75€" }
  ];
  
  const wishlistItems = [
    { name: "Mochila Trekker 65L", price: "149.99€", image: "/api/placeholder/80/80" },
    { name: "Botas Montaña Alpina", price: "189.95€", image: "/api/placeholder/80/80" }
  ];

  const handleLogout = () => {
    logout();
  };

  // Formatear la fecha de registro
  const formatJoinDate = () => {
    if (!user || !user.createdAt) return "Usuario desde: N/A";
    
    const date = new Date(user.createdAt);
    const options = { year: 'numeric', month: 'long' };
    return `Usuario desde: ${date.toLocaleDateString('es-ES', options)}`;
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Barra lateral */}
        <div className="profile-sidebar">
          <div className="profile-user">
           
            <div className="profile-user-info">
              <h3>{user ? `${user.realName} ${user.lastName}` : 'Cargando...'}</h3>
              <p>{user?.email || 'correo@ejemplo.com'}</p>
              <span className="profile-member-since">{formatJoinDate()}</span>
              {user?.isVerified && <span className="profile-verified"><i className="fas fa-check-circle"></i> Verificado</span>}
            </div>
          </div>
          
          <nav className="profile-nav">
            <ul>
              <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                <FaUser />
                <span>Resumen</span>
              </li>
              <li className={activeTab === 'personal' ? 'active' : ''} onClick={() => setActiveTab('personal')}>
                <FaEdit />
                <span>Datos Personales</span>
              </li>
              <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                <FaShoppingBag />
                <span>Mis Pedidos</span>
              </li>
              <li className={activeTab === 'wishlist' ? 'active' : ''} onClick={() => setActiveTab('wishlist')}>
                <FaHeart />
                <span>Lista de Deseos</span>
              </li>
              <li className={activeTab === 'payment' ? 'active' : ''} onClick={() => setActiveTab('payment')}>
                <FaCreditCard />
                <span>Métodos de Pago</span>
              </li>
              <li className={activeTab === 'addresses' ? 'active' : ''} onClick={() => setActiveTab('addresses')}>
                <FaMapMarkerAlt />
                <span>Direcciones</span>
              </li>
              <li className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
                <FaBell />
                <span>Notificaciones</span>
              </li>
              <li className="logout" onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Cerrar Sesión</span>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Contenido principal */}
        <div className="profile-content">
          {activeTab === 'dashboard' && (
            <>
              <div className="profile-welcome">
                <div className="welcome-text">
                  <h1>Bienvenido, {user ? user.realName : 'Usuario'}</h1>
                  <p>Desde tu panel de control puedes ver tus pedidos recientes, gestionar direcciones de envío y actualizar tus datos personales.</p>
                </div>
                <div className="welcome-image">
                  <img src="https://img1.wallspic.com/crops/9/6/1/4/7/174169/174169-paisaje_de_amanecer-naturaleza-la_pintura_de_paisaje-puesta-arte-7680x4320.jpg" alt="Bienvenida" />
                </div>
              </div>
              
              <div className="profile-stats">
                <div className="stat-card">
                  <div className="stat-icon orders">
                    <FaShoppingBag />
                  </div>
                  <div className="stat-details">
                    <h3>3</h3>
                    <p>Pedidos</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon wishlist">
                    <FaHeart />
                  </div>
                  <div className="stat-details">
                    <h3>2</h3>
                    <p>Lista de Deseos</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon reviews">
                    <i className="fas fa-star"></i>
                  </div>
                  <div className="stat-details">
                    <h3>5</h3>
                    <p>Reseñas</p>
                  </div>
                </div>
              </div>
              
              <div className="profile-sections">
                <div className="profile-section">
                  <div className="section-header">
                    <h2>Pedidos Recientes</h2>
                    <Link to="/orders" className="section-link">Ver todos</Link>
                  </div>
                  
                  <div className="order-list">
                    {recentOrders.map(order => (
                      <div className="order-item" key={order.id}>
                        <div className="order-info">
                          <h4>{order.id}</h4>
                          <span className="order-date">{order.date}</span>
                        </div>
                        <div className="order-status">
                          <span className={`status-badge ${order.status === 'Entregado' ? 'delivered' : 'processing'}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="order-total">
                          <span>{order.total}</span>
                        </div>
                        <div className="order-actions">
                          <button className="btn-details">Detalles</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="profile-section">
                  <div className="section-header">
                    <h2>Lista de Deseos</h2>
                    <Link to="/wishlist" className="section-link">Ver todos</Link>
                  </div>
                  
                  <div className="wishlist-items">
                    {wishlistItems.map((item, index) => (
                      <div className="wishlist-item" key={index}>
                        <div className="wishlist-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="wishlist-details">
                          <h4>{item.name}</h4>
                          <span className="wishlist-price">{item.price}</span>
                        </div>
                        <div className="wishlist-actions">
                          <button className="btn-add-cart">Añadir al Carrito</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'personal' && (
            <div className="profile-personal-info">
              <div className="section-header">
                <h2>Datos Personales</h2>
                <button className="btn-edit-profile">
                  <FaEdit /> Editar Perfil
                </button>
              </div>
              
              <div className="personal-info-card">
                <div className="info-row">
                  <div className="info-field">
                    <label>Nombre</label>
                    <div className="info-value">
                      <FaUser className="info-icon" />
                      <span>{user?.realName || 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="info-field">
                    <label>Apellido</label>
                    <div className="info-value">
                      <FaUser className="info-icon" />
                      <span>{user?.lastName || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="info-row">
                  <div className="info-field">
                    <label>Correo Electrónico</label>
                    <div className="info-value">
                      <FaEnvelope className="info-icon" />
                      <span>{user?.email || 'N/A'}</span>
                    </div>
                    {user?.isVerified ? 
                      <span className="verification-status verified">
                        <i className="fas fa-check-circle"></i> Verificado
                      </span> : 
                      <span className="verification-status not-verified">
                        <i className="fas fa-exclamation-circle"></i> No verificado
                      </span>
                    }
                  </div>
                  
                  <div className="info-field">
                    <label>Teléfono</label>
                    <div className="info-value">
                      <FaPhone className="info-icon" />
                      <span>{user?.phoneNumber || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="info-row">
                  <div className="info-field">
                    <label>Palabra secreta</label>
                    <div className="info-value">
                      <FaKey className="info-icon" />
                      <span>••••••••</span>
                    </div>
                  </div>
                  
                  <div className="info-field">
                    <label>Rol de Usuario</label>
                    <div className="info-value">
                      <i className={`fas ${user?.role === 'admin' ? 'fa-user-shield' : 'fa-user'} info-icon`}></i>
                      <span>{user?.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="section-header security-header">
                <h2>Seguridad</h2>
              </div>
              
              <div className="security-options">
                <button className="security-button">
                  <i className="fas fa-lock"></i> Cambiar Contraseña
                </button>
                
                <button className="security-button">
                  <i className="fas fa-key"></i> Actualizar Palabra Secreta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;