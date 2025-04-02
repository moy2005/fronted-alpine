import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/login.css';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await signin(data);
      
      // Captura específicamente el error de contraseña incorrecta
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
      // Manejo de errores inesperados
      console.error('Error inesperado:', error);
    }
  });

  useEffect(() => {
    if (signinErrors.length > 0) {
      signinErrors.forEach(error => {
        // Filtra el error de contraseña incorrecta para no duplicarlo
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
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="brand-logo">
              <i className="fas fa-mountain"></i>
              <span>AlpineGear</span>
            </div>
            <h1>Iniciar Sesión</h1>
            <p>Bienvenido de nuevo. Accede a tu cuenta para continuar.</p>
          </div>
          
          <form className="auth-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <div className="input-wrapper">
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
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Contraseña</label>
                <Link to="/forgot-password" className="forgot-link">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  {...register("password", { 
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres"
                    }
                  })}
                  placeholder="Contraseña"
                />
              </div>
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>

            <button type="submit" className="auth-button">
              Iniciar Sesión
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <div className="auth-footer">
            <p>¿No tienes una cuenta? <Link to="/register" className="register-link">Regístrate ahora</Link></p>
          </div>
        </div>
      </div>
      
      <div className="auth-background">
        <div className="overlay"></div>
      </div>
    </div>
  );
}

export default LoginPage;