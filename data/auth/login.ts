import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_URL}/auth`;

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string; 
    user: {
        id: string;
        email: string;
    };
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_BASE_URL}/authenticate`, credentials);
        console.log(response.data);
        return response.data; 
    } catch (error) {
        console.error('Login error:', error);
        throw error.response ? error.response.data : new Error('Login failed');
    }
};