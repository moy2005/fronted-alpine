import axios from "axios";

const instance = axios.create({
    baseURL: 'https://alpine-gear.vercel.app/api',
    headers: {
        'Content-Type': 'application/json'
    }
});


// Interceptor de solicitud MODIFICADO
instance.interceptors.request.use(
    (config) => {
        // Primero intenta con el token normal
        const token = localStorage.getItem('token');
        
        // Si no hay token normal, usa el temporal (para verify-email-code)
        if (!token && config.url.includes('verify-email-code')) {
            const tempToken = localStorage.getItem('tempToken');
            if (tempToken) {
                config.headers.Authorization = `Bearer ${tempToken}`;
            }
        } else if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuesta MEJORADO
instance.interceptors.response.use(
    (response) => {
        console.log("Respuesta recibida:", {
            status: response.status,
            headers: response.headers,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error("Error en la respuesta:", {
            config: error.config,
            response: error.response,
            message: error.message
        });
        
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            console.warn("Token inválido o expirado");
        }
        
        if (error.response?.status === 400 && 
            error.response?.data?.code === "SESSION_EXPIRED") {
            console.error("Sesión expirada - Posible problema con cookies");
        }
        
        return Promise.reject(error);
    }
);

export default instance;