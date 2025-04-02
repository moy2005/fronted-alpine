import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/verifyEmail.css"; 

function VerifyPage() {
    const [code, setCode] = useState("");
    const { verifyEmail } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await verifyEmail(email, code);
            if (result.success) {
                toast.success("Verificación exitosa. Redirigiendo...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                toast.error("Código incorrecto o expirado");
            }
        } catch (error) {
            console.error("Error al verificar el código:", error);
            toast.error("Hubo un error. Inténtalo de nuevo.");
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
                            <label htmlFor="verification-code">Código de verificación</label>
                            <div className="verify-input-container">
                                <input
                                    type="text"
                                    id="verification-code"
                                    className="verify-input"
                                    placeholder="Ingresa el código de 6 dígitos"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                            <p className="verify-hint">
                                Si no encuentras el código, revisa tu carpeta de spam.
                            </p>
                        </div>
                        
                        <button type="submit" className="verify-button">
                            Verificar y Continuar
                            <FaCheckCircle />
                        </button>
                    </form>
                    
                    <div className="verify-footer">
                        <button className="verify-resend">
                            ¿No recibiste el código? Enviar de nuevo
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="verify-background">
                <div className="verify-overlay"></div>
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