import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Check if user has specific role
  const hasRole = (role) => user && user.role === role;

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  // Toggle search bar on mobile
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }

      if (isProfileOpen && !event.target.closest('.user-dropdown')) {
        setIsProfileOpen(false);
      }
      
      if (isSearchOpen && !event.target.closest('.search-container') && !event.target.closest('.search-toggle')) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen, isProfileOpen, isSearchOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="site-header">
      <div className="top-banner">
        <div className="container">
          <p>Free shipping on orders over $75 | Use code WELCOME20 for 20% off</p>
        </div>
      </div>
      
      <div className="main-header">
        <div className="container">
          {/* Logo */}
          <div className="brand">
            <Link to="/">
              <i className="fas fa-mountain"></i>
              <span>AlpineGear</span>
            </Link>
          </div>

          {/* Navigation for desktop */}
          {!isMobile && (
            <nav className="desktop-nav">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Productos</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contactos</Link></li>
                {hasRole("admin") && (
                  <li className="admin-nav-item">
                    <Link to="/admin">Admin</Link>
                  </li>
                )}
              </ul>
            </nav>
          )}

          {/* Action buttons */}
          <div className="header-actions">
            {!isMobile && (
              <div className="search-container">
                <form className="search-form">
                  <input type="text" placeholder="Search products..." />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
            )}

            {isMobile && (
              <button className="icon-button search-toggle" onClick={toggleSearch} aria-label="Search">
                <i className="fas fa-search"></i>
              </button>
            )}

            {!user ? (
              <div className="auth-links">
                <Link to="/login" className="login-link">
                  <i className="fas fa-user"></i>
                  {!isMobile && <span>Login</span>}
                </Link>
              </div>
            ) : (
              <div className="user-dropdown">
                <button className="dropdown-trigger" onClick={toggleProfile}>
                  <i className="fas fa-user-circle"></i>
                  {!isMobile && <span>{user.name || "Account"}</span>}
                </button>
                
                <div className={`dropdown-menu ${isProfileOpen ? 'active' : ''}`}>
                  {hasRole("cliente") && (
                    <>
                      <Link to="/cliente/profile">My Account</Link>
                      <Link to="/orders">My Orders</Link>
                      <Link to="/iot-device">My Devices</Link>
                    </>
                  )}
                  
                  {hasRole("admin") && (
                    <>
                      <Link to="/admin/profile-admin">Admin Dashboard</Link>
                      <Link to="/admin/users">Manage Users</Link>
                      <Link to="/manage-products">Manage Products</Link>
                    </>
                  )}
                  
                  <button onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              </div>
            )}

            <Link to="/cart" className="cart-link">
              <i className="fas fa-shopping-cart"></i>
              {!isMobile && <span>Cart</span>}
              <span className="cart-count">0</span>
            </Link>

            {isMobile && (
              <button 
                className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
                onClick={toggleMenu}
                aria-label="Menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {isMobile && (
        <div className={`mobile-search ${isSearchOpen ? 'active' : ''}`}>
          <div className="container">
            <form className="search-form">
              <input type="text" placeholder="Search products..." autoFocus={isSearchOpen} />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobile && (
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <nav>
            <ul>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
              
              {hasRole("admin") && (
                <li className="admin-section">
                  <h3>Admin</h3>
                  <ul>
                    <li><Link to="/admin/profile-admin" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                    <li><Link to="/admin/users" onClick={() => setIsMenuOpen(false)}>Manage Users</Link></li>
                    <li><Link to="/manage-products" onClick={() => setIsMenuOpen(false)}>Manage Products</Link></li>
                  </ul>
                </li>
              )}
              
              {hasRole("cliente") && (
                <li className="account-section">
                  <h3>My Account</h3>
                  <ul>
                    <li><Link to="/cliente/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>
                    <li><Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link></li>
                  
                  </ul>
                </li>
              )}
              
              {!user ? (
                <li className="auth-section">
                  <Link to="/login" className="btn-login" onClick={() => setIsMenuOpen(false)}>
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                  <Link to="/register" className="btn-register" onClick={() => setIsMenuOpen(false)}>
                    <i className="fas fa-user-plus"></i> Sign Up
                  </Link>
                </li>
              ) : (
                <li className="logout-section">
                  <button onClick={handleLogout} className="btn-logout">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;