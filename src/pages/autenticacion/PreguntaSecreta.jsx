import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaKey, FaArrowLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../styles/forgotPassword.css';
import { verifyKeywordRequest } from '../../api/auth.js';

const PreguntaSecreta = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};
    const [secretWord, setSecretWord] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Si no hay email, redireccionar a la página de recuperación
    if (!email) {
        navigate('/forgot-password');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!secretWord) {
            toast.error('Por favor ingresa tu palabra secreta');
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Usamos la función del servicio API
            const response = await verifyKeywordRequest(email, secretWord);
            
            if (response.data.success) {
                toast.success(response.data.message || 'Se ha enviado un correo con instrucciones para recuperar tu contraseña');
                // Limpiar el campo de palabra secreta
                setSecretWord('');
                // Mantener al usuario en esta página para que vea el mensaje de éxito
            } else {
                toast.error(response.data.message || 'Palabra secreta incorrecta. Inténtalo de nuevo.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error de conexión. Verifica tu conexión a internet.';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-content">
                <div className="forgot-password-card">
                    <div className="forgot-password-header">
                        <div className="forgot-password-logo">
                            <i className="fas fa-mountain"></i>
                            <span>AlpineGear</span>
                        </div>
                        <div className="forgot-password-icon">
                            <FaKey />
                        </div>
                        <h1>Verificación de Seguridad</h1>
                        <p>Ingresa tu palabra secreta para continuar con la recuperación de contraseña</p>
                        <p className="email-display">Correo: {email}</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="forgot-password-form">
                        <div className="forgot-password-group">
                            <label htmlFor="secretWord">Palabra Secreta</label>
                            <div className="forgot-password-input-container">
                                <FaKey className="forgot-password-input-icon" />
                                <input
                                    type="password"
                                    id="secretWord"
                                    placeholder="Tu palabra secreta"
                                    value={secretWord}
                                    onChange={(e) => setSecretWord(e.target.value)}
                                    className="forgot-password-input"
                                    required
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="forgot-password-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Verificando...' : 'Verificar Palabra Secreta'}
                        </button>
                    </form>
                    
                    <div className="forgot-password-footer">
                        <Link to="/forgot-password" className="forgot-password-back-link">
                            <FaArrowLeft />
                            Volver
                        </Link>
                    </div>
                </div>
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
};

export default PreguntaSecreta;