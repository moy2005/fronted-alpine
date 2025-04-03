import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { FaEnvelope, FaCheckCircle, FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/verifyEmail.css"; 

function VerifyPage() {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { verifyEmail } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { email, tempToken } = location.state || {};

    // Redirigir si no hay email o tempToken
    if (!email || !tempToken) {
        navigate("/register");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (code.length !== 6) {
            toast.error("El código debe tener 6 dígitos");
            return;
        }

        setIsLoading(true);
        
        try {
            const result = await verifyEmail(email, code, tempToken);
            if (result.success) {
                toast.success(result.message || "¡Verificación exitosa! Redirigiendo...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                toast.error(result.message || "Código incorrecto o expirado");
            }
        } catch (error) {
            console.error("Error al verificar el código:", error);
            toast.error(error.message || "Hubo un error. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        try {
            // Aquí deberías implementar la lógica para reenviar el código
            toast.info("Se ha reenviado el código de verificación");
        } catch (error) {
            toast.error("Error al reenviar el código");
        }
    };

    return (
        <div className="verify-page">
            <div className="verify-content">
                <div className="verify-card">
                    <div className="verify-header">
                        <div className="verify-logo">
                            <i className="fas fa-mountain"></i>
                            <span>AlpineGear</span>
                        </div>
                        <div className="verify-icon">
                            <FaEnvelope />
                        </div>
                        <h1>Verificar Correo</h1>
                        <p>Hemos enviado un código de verificación a <strong>{email}</strong></p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="verify-form">
                        <div className="verify-group">
                            <label htmlFor="verification-code">Código de verificación (6 dígitos)</label>
                            <div className="verify-input-container">
                                <input
                                    type="text"
                                    id="verification-code"
                                    className="verify-input"
                                    placeholder="Ingresa el código de 6 dígitos"
                                    value={code}
                                    onChange={(e) => {
                                        // Validar que solo sean números y máximo 6 dígitos
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                        setCode(value);
                                    }}
                                    maxLength={6}
                                    pattern="\d{6}"
                                    required
                                />
                            </div>
                            <p className="verify-hint">
                                Si no encuentras el código, revisa tu carpeta de spam.
                            </p>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="verify-button"
                            disabled={isLoading || code.length !== 6}
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="spin" /> Verificando...
                                </>
                            ) : (
                                <>
                                    Verificar y Continuar
                                    <FaCheckCircle />
                                </>
                            )}
                        </button>
                    </form>
                    
                  
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
}

export default VerifyPage;