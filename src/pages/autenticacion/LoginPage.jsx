import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/register.css";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await signin(data);
      
      if (result?.error) {
        toast.error(result.error, { 
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  });

  useEffect(() => {
    if (signinErrors.length > 0) {
      signinErrors.forEach(error => {
        if (!error.includes('Contraseña incorrecta')) {
          toast.error(error, { 
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });
    }
  }, [signinErrors]);

  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success("Inicio de sesión exitoso!", { 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      switch (user.role) {
        case 'admin':
          navigate("/admin/profile-admin");
          break;
        case 'cliente':
          navigate("/cliente/profile");
          break;
        default:
          navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="register-page">
      <div className="register-content">
        <div className="register-card">
          <div className="register-header">
            <div className="register-logo">
              <i className="fas fa-mountain"></i>
              <span>AlpineGear</span>
            </div>
            <h1>Iniciar Sesión</h1>
            <p>Bienvenido de nuevo. Accede a tu cuenta para continuar.</p>
          </div>
          
          <form className="register-form" onSubmit={onSubmit}>
            {/* Email */}
            <div className="register-group">
              <label htmlFor="email" className="register-label">Correo electrónico</label>
              <div className="register-input-container">
                <FaEnvelope className="register-input-icon" />
                <input
                  type="email"
                  id="email"
                  {...register("email", { 
                    required: "El correo es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Correo electrónico inválido"
                    }
                  })}
                  className="register-input"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              {errors.email && (
                <div className="register-validation">{errors.email.message}</div>
              )}
            </div>

            {/* Password */}
            <div className="register-group">
              <div className="register-label-row">
                <label htmlFor="password" className="register-label">Contraseña</label>
                <Link to="/forgot-password" className="register-login-link">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="register-input-container">
                <FaLock className="register-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", { 
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres"
                    }
                  })}
                  className="register-input"
                  placeholder="Contraseña"
                />
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility} 
                  className="register-toggle-btn"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <div className="register-validation">{errors.password.message}</div>
              )}
            </div>

            <button type="submit" className="register-button">
              Iniciar Sesión
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <div className="register-footer">
            <p>¿No tienes una cuenta? <Link to="/register" className="register-login-link">Regístrate ahora</Link></p>
          </div>
        </div>
      </div>
      
      <div className="register-background">
        <div className="register-overlay"></div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default LoginPage;