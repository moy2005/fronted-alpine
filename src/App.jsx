import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { CategoryProvider } from './context/CategoryContext.jsx'; // Añadido correctamente
import { MarcaProvider } from './context/MarcaContext.jsx'; // Añadido correctamente
import ProtectedRoute from './ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Páginas públicas
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/publica/AboutPage.jsx';
import ContactPage from './pages/publica/ContactPage.jsx';
import LocationPage from './pages/publica/LocationPage.jsx';
import CatalogPage from './pages/publica/CatalogPage.jsx';
import ProductDetailPage from './pages/publica/ProductDetailPage.jsx';
import OffersPage from './pages/publica/OffersPage.jsx';

// Páginas de autenticación
import RegisterPage from './pages/autenticacion/RegisterPage.jsx';
import LoginPage from './pages/autenticacion/LoginPage.jsx';
import ForgotPassword from './pages/autenticacion/ForgotPassword.jsx';
import ResetPassword from './pages/autenticacion/ResetPassword.jsx';
import VerificationPage from './pages/autenticacion/VerificationPage.jsx';

// Páginas privadas - Cliente
import ProfilePage from './pages/client/ProfilePage.jsx';
import OrdersPage from './pages/client/OrdersPage.jsx';
import IoTDevicePage from './pages/client/IoTDevicePage.jsx';

// Páginas privadas - Administrador
import ManageOrdersPage from './pages/admin/ManageOrdersPage.jsx';
import ManageProductsPage from './pages/admin/ManageProductsPage.jsx';
import UsersManagementPage from './pages/admin/UsersManagementPage.jsx';
import ReportsPage from './pages/admin/ReportsPage.jsx';
import ProfilePageAdmin from './pages/admin/ProfilePageAdmin.jsx';

// Pagina de acceso denegado
import AccessDeniedPage from './pages/AccessDeniedPage.jsx'
import UpdateProductForm from './pages/admin/UpdateProductForm.jsx';
import Footer from './pages/publica/Footer.jsx';
import ProductCreate from './pages/admin/ProductCreate.jsx';
import PreguntaSecreta from './pages/autenticacion/PreguntaSecreta.jsx';


function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CategoryProvider> 
          <MarcaProvider> 
            <BrowserRouter>
              <main>
                <Navbar /> {/* Barra de navegación */}
                <ToastContainer position="top-right" autoClose={3000} />
                
                <Routes>
                  {/* 📌 Rutas Públicas */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/location" element={<LocationPage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/offers" element={<OffersPage />} />

                  {/* 📌 Autenticación */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  <Route path="/verify" element={<VerificationPage />} />
                  <Route path="/pregunta-secreta" element={<PreguntaSecreta />} />

                  {/* 📌 Rutas Protegidas */}
                  <Route element={<ProtectedRoute allowedRoles={['cliente']} />}>
                    <Route path="/cliente/profile" element={<ProfilePage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/iot-device" element={<IoTDevicePage />} />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin/profile-admin" element={<ProfilePageAdmin />} />
                    <Route path="/manage-orders" element={<ManageOrdersPage />} />
                    <Route path="/manage-products" element={<ManageProductsPage />} />
                    <Route path="/products/create" element={<ProductCreate />} />
                    <Route path="/products/update/:id" element={<UpdateProductForm />} />
                    <Route path="/users-management" element={<UsersManagementPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                  </Route>

                  {/* 📌 Página de Acceso Denegado */}
                  <Route path="/access-denied" element={<AccessDeniedPage />} />
                </Routes>

                <Footer /> {/* Footer */}
              </main>
            </BrowserRouter>
          </MarcaProvider>
        </CategoryProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
