import React from 'react';
import classes from '../components/auth/Login.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Form/Button';


const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();    
    navigate('/login');
  };
  

  return (
    <section className={classes.auth}>
      <h1>We have everything here deploy!</h1>
      <Button onClick={handleSubmit} text='Get everything'/>      
    </section>
  )
}

export default Home
