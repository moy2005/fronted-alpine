import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaKey, FaArrowLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../styles/forgotPassword.css';
import { checkEmailRequest } from '../../api/auth';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error('Por favor ingresa tu correo electrónico');
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Verificamos si el email existe usando el servicio API
            const response = await checkEmailRequest(email);
            
            if (response.data.success) {
                // Si el email existe, redirigir a la página de pregunta secreta
                navigate('/pregunta-secreta', { state: { email } });
            } else {
                toast.error(response.data.message || 'Correo electrónico no encontrado.');
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
                        <h1>Recuperar Contraseña</h1>
                        <p>Ingresa tu correo electrónico para comenzar el proceso de recuperación</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="forgot-password-form">
                        <div className="forgot-password-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <div className="forgot-password-input-container">
                                <FaEnvelope className="forgot-password-input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="tucorreo@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            {isSubmitting ? 'Verificando...' : 'Continuar'}
                        </button>
                    </form>
                    
                    <div className="forgot-password-footer">
                        <Link to="/login" className="forgot-password-back-link">
                            <FaArrowLeft />
                            Volver al inicio de sesión
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

export default ForgotPassword;

