import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaLock, FaExclamationTriangle, FaCheckCircle, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../styles/resetPassword.css';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidToken, setIsValidToken] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setLoading(false);
                setIsValidToken(false);
                return;
            }
    
            try {
                const response = await fetch(`http://localhost:4000/api/verifyTokenReset`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });
                
                if (!response.ok) {
                    throw new Error('Token inválido o expirado');
                }
    
                const data = await response.json();
                setIsValidToken(true);
            } catch (error) {
                console.error('Error verificando el token:', error);
                setIsValidToken(false);
            } finally {
                setLoading(false);
            }
        };
    
        verifyToken();
    }, [token]);
    
    // Funciones de validación secuencial (igual que en RegisterPage)
    const getPasswordFirstError = (password) => {
        if (password.length < 8) return "Mínimo 8 caracteres";
        if (!/[A-Z]/.test(password)) return "Debe contener al menos una mayúscula";
        if (!/[a-z]/.test(password)) return "Debe contener al menos una minúscula";
        if (!/\d/.test(password)) return "Debe contener al menos un número";
        if (!/[@$!%*?&]/.test(password)) return "Debe contener al menos un símbolo especial (@$!%*?&)";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación de la contraseña
        const passwordError = getPasswordFirstError(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await response.json();
            
            if (response.ok) {
                toast.success(data.message || 'Contraseña restablecida con éxito');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                toast.error(data.message || 'Error al restablecer la contraseña');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Hubo un problema al restablecer tu contraseña');
        }
    };

    if (loading) {
        return (
            <div className="reset-loading-container">
                <div className="reset-loading-card">
                    <FaSpinner className="reset-spinner" />
                    <p>Verificando enlace...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="reset-password-page">
            <div className="reset-password-content">
                {isValidToken ? (
                    <div className="reset-password-card">
                        <div className="reset-password-header">
                            <div className="reset-password-logo">
                                <i className="fas fa-mountain"></i>
                                <span>AlpineGear</span>
                            </div>
                            <div className="reset-password-icon">
                                <FaLock />
                            </div>
                            <h1>Crear Nueva Contraseña</h1>
                            <p>Ingresa y confirma tu nueva contraseña para tu cuenta</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="reset-password-form">
                            <div className="reset-password-group">
                                <label htmlFor="password">Nueva contraseña</label>
                                <div className="reset-password-input-container">
                                    <FaLock className="reset-password-input-icon" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Ingresa tu nueva contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="reset-password-input"
                                        minLength="8"
                                        required
                                    />
                                    <button 
                                        type="button" 
                                        className="reset-password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {password && (
                                    <div className="reset-password-validation">
                                        {getPasswordFirstError(password)}
                                    </div>
                                )}
                            </div>
                            
                            <div className="reset-password-group">
                                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                                <div className="reset-password-input-container">
                                    <FaLock className="reset-password-input-icon" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        placeholder="Confirma tu nueva contraseña"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="reset-password-input"
                                        minLength="8"
                                        required
                                    />
                                    <button 
                                        type="button" 
                                        className="reset-password-toggle-btn"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <div className="reset-password-validation">
                                        Las contraseñas no coinciden
                                    </div>
                                )}
                            </div>
                            
                            <div className="reset-password-requirements">
                                <p>La contraseña debe:</p>
                                <ul>
                                    <li className={password.length >= 8 ? "valid" : ""}>
                                        <i className={password.length >= 8 ? "fas fa-check" : "fas fa-times"}></i>
                                        Tener al menos 8 caracteres
                                    </li>
                                    <li className={/[A-Z]/.test(password) ? "valid" : ""}>
                                        <i className={/[A-Z]/.test(password) ? "fas fa-check" : "fas fa-times"}></i>
                                        Contener al menos una mayúscula
                                    </li>
                                    <li className={/[a-z]/.test(password) ? "valid" : ""}>
                                        <i className={/[a-z]/.test(password) ? "fas fa-check" : "fas fa-times"}></i>
                                        Contener al menos una minúscula
                                    </li>
                                    <li className={/\d/.test(password) ? "valid" : ""}>
                                        <i className={/\d/.test(password) ? "fas fa-check" : "fas fa-times"}></i>
                                        Contener al menos un número
                                    </li>
                                    <li className={/[@$!%*?&]/.test(password) ? "valid" : ""}>
                                        <i className={/[@$!%*?&]/.test(password) ? "fas fa-check" : "fas fa-times"}></i>
                                        Contener al menos un símbolo especial (@$!%*?&)
                                    </li>
                                </ul>
                            </div>
                            
                            <button type="submit" className="reset-password-button">
                                Restablecer Contraseña
                                <FaCheckCircle />
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="reset-password-card reset-password-invalid">
                        <div className="reset-password-header">
                            <div className="reset-password-logo">
                                <i className="fas fa-mountain"></i>
                                <span>AlpineGear</span>
                            </div>
                            <div className="reset-password-icon reset-password-error-icon">
                                <FaExclamationTriangle />
                            </div>
                            <h1>Enlace no válido</h1>
                            <p>El enlace para restablecer tu contraseña ha expirado o no es válido.</p>
                        </div>
                        
                        <Link to="/forgot-password" className="reset-password-button reset-password-retry">
                            Solicitar nuevo enlace
                        </Link>
                        
                        <div className="reset-password-footer">
                            <Link to="/login" className="reset-password-back-link">
                                <i className="fas fa-arrow-left"></i>
                                Volver al inicio de sesión
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="reset-password-background">
                <div className="reset-password-overlay"></div>
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

export default ResetPassword;