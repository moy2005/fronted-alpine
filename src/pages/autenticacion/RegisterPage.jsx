import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaKey, FaQuestion } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/register.css";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  // Mostrar errores del servidor usando toastify
  useEffect(() => {
    if (!registerErrors) return;

    // Si es un string, mostrarlo directamente
    if (typeof registerErrors === 'string') {
      toast.error(registerErrors);
    }

    // Si es un array, mostrar cada error
    else if (Array.isArray(registerErrors)) {
      registerErrors.forEach(error => toast.error(error));
    }

    // Si es un objeto, mostrar los valores
    else if (typeof registerErrors === 'object') {
      Object.values(registerErrors).forEach(error => toast.error(error));
    }
  }, [registerErrors]);

  const watchPassword = watch("password", "");
  const watchConfirmPassword = watch("confirmPassword", "");
  const watchEmail = watch("email", "");
  const watchPhone = watch("phoneNumber", "");

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  // Modificar el onSubmit para usar toastify
  const onSubmit = async (values) => {
    try {
      const result = await signup(values);
      if (result?.success) {
        toast.success("¡Registro exitoso! Verifica tu correo electrónico.");
        navigate("/verify", { state: { email: values.email } });
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      toast.error("Ocurrió un error durante el registro. Inténtalo de nuevo.");
    }
  };

  // Funciones de validación secuencial
  const getPasswordFirstError = (password) => {
    if (password.length < 8) return "Mínimo 8 caracteres";
    if (!/[A-Z]/.test(password)) return "Debe contener al menos una mayúscula";
    if (!/[a-z]/.test(password)) return "Debe contener al menos una minúscula";
    if (!/\d/.test(password)) return "Debe contener al menos un número";
    if (!/[@$!%*?&]/.test(password)) return "Debe contener al menos un símbolo especial (@$!%*?&)";
    return null;
  };

  const getEmailFirstError = (email) => {
    if (!email) return "El correo es requerido";
    if (!email.includes('@')) return "Debe contener @";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) return "Formato de correo inválido";
    return null;
  };

  const getPhoneFirstError = (phone) => {
    if (!phone) return "El número es requerido";
    if (!/^\d+$/.test(phone)) return "Solo debe contener números";
    if (phone.length !== 10) return "Debe tener exactamente 10 dígitos";
    return null;
  };

  const getNameFirstError = (name, fieldName) => {
    if (!name) return `${fieldName} es requerido`;
    if (name.length < 2) return "Mínimo 2 caracteres";
    if (name.length > 50) return "Máximo 50 caracteres";
    return null;
  };

  // Lista de preguntas de seguridad
  const securityQuestions = [
    "Selecciona una pregunta de seguridad",
    "¿Cuál es el nombre de tu primera mascota?",
    "¿En qué ciudad naciste?",
    "¿Cuál es el nombre de tu colegio primario?",
    "¿Cuál es tu comida favorita?",
    "¿Cuál es el segundo nombre de tu madre?",
    "¿Cuál era tu apodo de la infancia?"
  ];

  return (
    <div className="register-page">
      <div className="register-content">
        <div className="register-card">
          <div className="register-header">
            <div className="register-logo">
              <i className="fas fa-mountain"></i>
              <span>AlpineGear</span>
            </div>
            <h1>Crear Cuenta</h1>
            <p>Únete a nuestra comunidad de aventureros</p>
          </div>
          
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="register-columns">
              {/* Columna izquierda */}
              <div className="register-column">
                {/* Nombre real */}
                <div className="register-group">
                  <label htmlFor="realName" className="register-label">Nombre</label>
                  <div className="register-input-container">
                    <FaUser className="register-input-icon" />    
                    <input
                      type="text"
                      id="realName"
                      {...register("realName", {
                        required: true,
                        minLength: 2,
                        maxLength: 50
                      })}
                      className="register-input"
                      placeholder="Nombre"
                    />
                  </div>
                  {watch("realName") !== undefined && (
                    <div className="register-validation">
                      {getNameFirstError(watch("realName"), "Nombre")}
                    </div>
                  )}
                </div>

                {/* Correo electrónico */}
                <div className="register-group">
                  <label htmlFor="email" className="register-label">Correo electrónico</label>
                  <div className="register-input-container">
                    <FaEnvelope className="register-input-icon" />
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                      })}
                      className="register-input"
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>
                  {watchEmail && (
                    <div className="register-validation">
                      {getEmailFirstError(watchEmail)}
                    </div>
                  )}
                </div>

                {/* Contraseña */}
                <div className="register-group">
                  <label htmlFor="password" className="register-label">Contraseña</label>
                  <div className="register-input-container">
                    <FaLock className="register-input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/
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
                  {watchPassword && (
                    <div className="register-validation">
                      {getPasswordFirstError(watchPassword)}
                    </div>
                  )}
                </div>
              </div>

              {/* Columna derecha */}
              <div className="register-column">
                {/* Apellido */}
                <div className="register-group">
                  <label htmlFor="lastName" className="register-label">Apellido</label>
                  <div className="register-input-container">
                    <FaUser className="register-input-icon" />
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName", {
                        required: true,
                        minLength: 2,
                        maxLength: 50
                      })}
                      className="register-input"
                      placeholder="Apellido"
                    />
                  </div>
                  {watch("lastName") !== undefined && (
                    <div className="register-validation">
                      {getNameFirstError(watch("lastName"), "Apellido")}
                    </div>
                  )}
                </div>

                {/* Número de teléfono */}
                <div className="register-group">
                  <label htmlFor="phoneNumber" className="register-label">Número de teléfono</label>
                  <div className="register-input-container">
                    <FaPhone className="register-input-icon" />
                    <input
                      type="tel"
                      id="phoneNumber"
                      {...register("phoneNumber", {
                        required: true,
                        pattern: /^\d{10}$/
                      })}
                      className="register-input"
                      placeholder="Número a 10 dígitos"
                    />
                  </div>
                  {watchPhone && (
                    <div className="register-validation">
                      {getPhoneFirstError(watchPhone)}
                    </div>
                  )}
                </div>

                {/* Confirmar Contraseña */}
                <div className="register-group">
                  <label htmlFor="confirmPassword" className="register-label">Confirmar Contraseña</label>
                  <div className="register-input-container">
                    <FaLock className="register-input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: true,
                        validate: value => value === getValues("password")
                      })}
                      className="register-input"
                      placeholder="Confirmar contraseña"
                    />
                    <button 
                      type="button" 
                      onClick={toggleConfirmPasswordVisibility} 
                      className="register-toggle-btn"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {watchConfirmPassword && watchPassword !== watchConfirmPassword && (
                    <div className="register-validation">
                      Las contraseñas no coinciden
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pregunta de seguridad - Nueva adición */}
            <div className="register-group register-full-width">
              <label htmlFor="securityQuestion" className="register-label">Pregunta de seguridad</label>
              <div className="register-input-container">
                <FaQuestion className="register-input-icon" />
                <select 
                  id="securityQuestion" 
                  className="register-input"
                  {...register("securityQuestion", {
                    required: true,
                    validate: value => value !== securityQuestions[0]
                  })}
                >
                  {securityQuestions.map((question, index) => (
                    <option key={index} value={question} disabled={index === 0}>
                      {question}
                    </option>
                  ))}
                </select>
              </div>
              {watch("securityQuestion") === securityQuestions[0] && (
                <div className="register-validation">
                  Debes seleccionar una pregunta de seguridad
                </div>
              )}
            </div>

            {/* Palabra secreta */}
            <div className="register-group register-full-width">
              <label htmlFor="secretWord" className="register-label">Palabra secreta</label>
              <div className="register-input-container">
                <FaKey className="register-input-icon" />
                <input
                  type="text"
                  id="secretWord"
                  {...register("secretWord", {
                    required: true,
                    minLength: 4
                  })}
                  className="register-input"
                  placeholder="Respuesta a pregunta de seguridad"
                />
              </div>
              {watch("secretWord") && watch("secretWord").length < 4 && (
                <div className="register-validation">
                  Mínimo 4 caracteres
                </div>
              )}
            </div>

            <button type="submit" className="register-button">
              Crear cuenta
              <i className="fas fa-user-plus"></i>
            </button>
          </form>

          <div className="register-footer">
            <p>¿Ya tienes una cuenta? <Link to="/login" className="register-login-link">Inicia sesión</Link></p>
          </div>
        </div>
      </div>
      
      <div className="register-background">
        <div className="register-overlay"></div>
      </div>
      
      {/* ToastContainer para mostrar notificaciones */}
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

export default RegisterPage;