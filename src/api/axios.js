import axios from "axios";

const instance = axios.create({
    baseURL: 'https://alpine-gear.vercel.app/api',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

// Interceptor de solicitud MODIFICADO
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("Configuración de la solicitud:", {
            url: config.url,
            withCredentials: config.withCredentials,
            headers: config.headers
        });
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Asegurar que withCredentials no se sobreescriba
        config.withCredentials = true;
        return config;
    },
    (error) => {
        console.error("Error en interceptor de solicitud:", error);
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