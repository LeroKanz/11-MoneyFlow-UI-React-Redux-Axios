import classes from './Login.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/loginSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Form/Button';


const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logout());
        localStorage.removeItem("persist");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate('/home');
    };

    return (
        <section className={classes.auth}>
            <h1>Logout</h1>
            <Button onClick={handleSubmit} text='Login'/>
        </section>
    );
};

export default Logout;
