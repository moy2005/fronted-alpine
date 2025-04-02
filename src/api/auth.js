import axios from './axios'

export const registerRequest = async (user) => {
    try {
        const response = await axios.post('/register', user);
        return response;
    } catch (error) {
        throw error;
    }
};

// Función para el inicio de sesión
export const loginRequest = async (user) => {
    try {
        const response = await axios.post('/login', user);
        return response;
    } catch (error) {
        throw error;
    }
};

// Función para verificar el token
export const verifyTokenRequest = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token para verificación:', !!token);
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const response = await axios.get('/verify', config);
        console.log('Respuesta de verificación:', response.data);
        return response;
    } catch (error) {
        console.error('Error en verifyTokenRequest:', error.response?.data);
        throw error;
    }
};

export const verifyEmailRequest = async (email, code) => {
    return await axios.post(
        "http://localhost:4000/api/verify-email-code",
        { email, code },
        { withCredentials: true }  // Habilitar el envío de cookies
    );
};

