import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'auth_token';

export const setToken = (token: string, expires: number = 7) => {
    Cookies.set(TOKEN_KEY, token, { expires, secure: true, sameSite: 'strict' });
};

export const getToken = (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
    Cookies.remove(TOKEN_KEY);
};

export const isTokenValid = (token: string): boolean => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp !== undefined && decoded.exp > currentTime;
    } catch (error) {
        return false;
    }
};
