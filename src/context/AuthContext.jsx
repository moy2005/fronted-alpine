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
                setUser(null);  
                return { success: true };
            }
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data.message]);
            }
        }
    };


    const verifyEmail = async (email, code) => {
        try {
            // Validaciones básicas antes de hacer la petición
            if (!email || !code) {
                return {
                    success: false,
                    message: "Email y código son requeridos"
                };
            }

            const res = await verifyEmailRequest(email, code);

            // Log para debugging
            console.log("Respuesta del servidor en verifyEmail:", res?.data);

            // Verificación más robusta de la respuesta
            if (res?.data?.success) {
                return {
                    success: true,
                    message: res.data.message || "Email verificado exitosamente"
                };
            }

            // Si no hay éxito pero hay respuesta
            return {
                success: false,
                message: res?.data?.message || "Código incorrecto o expirado"
            };

        } catch (error) {
            // Log detallado del error
            console.error("Error en verifyEmail:", {
                responseData: error.response?.data,
                message: error.message,
                status: error.response?.status
            });

            // Manejo específico según el código de error
            if (error.response?.status === 400) {
                return {
                    success: false,
                    message: "Código inválido o sesión expirada"
                };
            }

            // Error general
            return {
                success: false,
                message: error.response?.data?.message || "Error al verificar el código"
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

