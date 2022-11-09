import axios from '../api/axios'
import { useDispatch } from 'react-redux';
import { login } from '../redux/loginSlice';

const localDataToken = localStorage.getItem('token');
const localDataRefreshToken = localStorage.getItem('refreshToken');

const useRefreshToken = () => {
const dispatch = useDispatch();
    const refresh = async () => {
        const response = await axios.post('/UsersAccounts/refresh-token',
            JSON.stringify({ token: localDataToken, refreshToken: localDataRefreshToken }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });

        dispatch(login({isAuth: true, token: response.data.token, refreshToken: response.data.refreshToken}));

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken
