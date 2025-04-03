import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, verifyEmailRequest } from "../api/auth.js";
import Cookies from 'js-cookie'
import axios from 'axios';

export const AuthContext = createContext()

export const useAuth = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthPrivider")
    }
    return context
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            
            if (res.data.success) {
                // Guardar el token temporal para verificación
                localStorage.setItem('tempToken', res.data.tempToken);
                
                return { 
                    success: true,
                    tempToken: res.data.tempToken,
                    userId: res.data.userId
                };
            }
        } catch (error) {
            let errorMessage = "Error al registrar";
            
            if (error.response?.data?.code === "EMAIL_IN_USE") {
                errorMessage = "El correo ya está registrado";
            } else if (error.response?.data?.code === "MISSING_FIELDS") {
                errorMessage = "Todos los campos son requeridos";
            }
            
            setErrors([errorMessage]);
            return { success: false, error: errorMessage };
        }
    };
    


    const verifyEmail = async (email, code) => {
        try {
            const tempToken = localStorage.getItem('tempToken');
            if (!tempToken) {
                throw new Error("No se encontró token de verificación");
            }
    
            const res = await verifyEmailRequest(email, code, tempToken);
            
            if (res.data?.success) {
                // Guardar el token definitivo
                localStorage.setItem('token', res.data.token);
                localStorage.removeItem('tempToken'); // Limpiar token temporal
                
                setUser(res.data.user);
                setIsAuthenticated(true);
                
                return { 
                    success: true, 
                    message: "Email verificado exitosamente",
                    token: res.data.token
                };
            }
            
            return { 
                success: false, 
                message: res.data?.message || "Código incorrecto" 
            };
            
        } catch (error) {
            let message = 'Error al verificar el código';
            
            if (error.response?.data?.code === "INVALID_CODE") {
                message = "Código incorrecto";
            } else if (error.response?.data?.code === "CODE_EXPIRED") {
                message = "El código ha expirado, por favor regístrese nuevamente";
            } else if (error.message.includes("jwt expired")) {
                message = "Tiempo de verificación agotado, por favor regístrese nuevamente";
            }
            
            return {
                success: false,
                message
            };
        }
    };
    


    const verifyToken = async () => {
        const token = localStorage.getItem("token");
        console.log('Iniciando verificación de token:', !!token);
        
        if (!token) {
            setLoading(false);
            setIsAuthenticated(false);
            setUser(null);
            return;
        }

        try {
            const res = await verifyTokenRequest();
            console.log('Respuesta de verificación:', res.data);

            // La respuesta viene directamente con los datos del usuario
            if (res.data && res.data.id) {
                setUser(res.data);  // Los datos del usuario vienen directamente
                setIsAuthenticated(true);
                console.log('Usuario autenticado:', res.data);
            } else {
                console.warn('Respuesta sin datos de usuario:', res.data);
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Error en verificación:', error);
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };



    const signin = async (data) => {
        try {
            setLoading(true);
            
            const response = await loginRequest(data);
            
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setUser(response.data.user || response.data);
                setIsAuthenticated(true);
                return { success: true };
            }
        } catch (error) {
            console.error('Error en signin:', error);
            
            // Manejo de errores del backend
            if (error.response) {
                // Errores 400 (Usuario no encontrado, Contraseña incorrecta)
                if (error.response.status === 400) {
                    const errorMessage = Array.isArray(error.response.data) 
                        ? error.response.data[0] 
                        : error.response.data.message || "Credenciales inválidas";
                    
                    return { 
                        success: false, 
                        error: errorMessage 
                    };
                }
                // Otros errores del servidor
                return {
                    success: false,
                    error: error.response.data.message || "Error del servidor"
                };
            }
            
            // Errores de red
            return {
                success: false,
                error: "Error de conexión. Verifica tu internet"
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        console.log('AuthProvider montado - verificando token');
        verifyToken();
    }, []);
    

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [errors])

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            loading,
            user,
            verifyEmail,
            isAuthenticated,
            errors,
            verifyToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

