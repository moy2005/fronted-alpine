// Este componente es una ruta protegida en React, utilizada para restringir el acceso a ciertas rutas según la autenticación del usuario.
// Si el usuario no está autenticado, será redirigido a la página de inicio de sesión.
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Spinner from './components/Spinner';

function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();

  console.log("🔄 Página recargada");
  console.log("🔐 isAuthenticated:", isAuthenticated);
  console.log("👤 Usuario autenticado:", user);
  console.log("📜 Roles permitidos:", allowedRoles);

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    console.warn("⚠️ No autenticado, redirigiendo a /login...");
    return <Navigate to="/login" />;
  }

  if (!user || !user.role || !allowedRoles.includes(user.role)) {
    console.warn("🚫 Rol no permitido, redirigiendo a /access-denied...");
    return <Navigate to="/access-denied" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

