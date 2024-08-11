import Cookies from 'js-cookie';
import { useGlobalState } from '@/contexts/globalStataeContext';
import axios from 'axios';

export const getTokenFromCookie = Cookies.get('token')

export const getTokenFromContext = () => {
    const {token} = useGlobalState
    return token
}

export const getUserFromCookie = async (token) => {
    if (!token) {
        console.error('No token provided');
        return null;
    }
    try {
        const response = await axios.get("http://localhost:8000/user/profile", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Something went wrong:', error.response ? error.response.data : error.message);
        return null;
    }
}

export const fetchUserProfile = async () => {
    var token = getTokenFromCookie;
    if (token) {
        const userProfile = await getUserFromCookie(token);
        return userProfile
    }
    token = getTokenFromContext()
    if(token){
        const userProfile = await getUserFromCookie(token);
        return userProfile
    }
}
