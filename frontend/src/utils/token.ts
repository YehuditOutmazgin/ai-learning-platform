import { jwtDecode } from 'jwt-decode';

type TokenPayload = {
    userId: string | undefined;
    name: string; 
    role: string;
    iat: number;
    exp: number;
};
export const setToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};


export const removeToken = () => {
    localStorage.removeItem('token');
};

export const getUserFromToken = (): TokenPayload | null => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode<TokenPayload>(token);

        const now = Date.now() / 1000; 
        if (decoded.exp < now) {
            console.warn('הטוקן פג תוקף');
            removeToken(); 
            return null;
        }

        return decoded;
    } catch (err) {
        console.error('שגיאה בפענוח הטוקן:', err);
        return null;
    }
};
export const isAdmin = (): boolean => {
    const token = getToken();
    if (!token) return false;

    try {
        const now = Date.now() / 1000; 

        const decoded = jwtDecode<TokenPayload>(token);
        if (decoded.exp < now) {
            console.warn('הטוקן פג תוקף');
            removeToken(); 
            return false;
        }
        return decoded.role === 'admin';
    } catch (e) {
        return false;
    }
};
