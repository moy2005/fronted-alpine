import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaKey, FaArrowLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../styles/forgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [secretWord, setSecretWord] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !secretWord) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await fetch('https://alpine-gear.vercel.app/api/verify-keyword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, secretWord }),
            });

            const data = await response.json();
            
            if (response.ok) {
                toast.success(data.message || 'Se ha enviado un correo con instrucciones para recuperar tu contraseña');
                setEmail('');
                setSecretWord('');
            } else {
                toast.error(data.message || 'Credenciales incorrectas. Verifica tu correo y palabra secreta.');
            }
        } catch (error) {
            toast.error('Error de conexión. Verifica tu conexión a internet.');
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
                        <p>Ingresa tu correo electrónico y palabra secreta para recibir instrucciones</p>
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
                            {isSubmitting ? 'Enviando...' : 'Enviar Instrucciones'}
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