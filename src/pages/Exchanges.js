import React, { useEffect, useState } from 'react'
import { useDispatch,  } from 'react-redux';
import { getAllExchanges } from '../redux/exchangeSlice';
import { getAllAccounts } from '../redux/accountSlice';
import ExchangesList from '../components/exchanges/ExchangesList';
import ExchangeAdd from '../components/exchanges/ExchangeAdd';
import useAxios from '../hooks/useAxios';
import Button from '../ui/Form/Button';


function Exchanges() {
  const axiosPrivate = useAxios();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getExchanges = async () => {
      try {
        const response = await axiosPrivate.get('/Exchanges', {
          signal: controller.signal
        });
        const accountsResponse = await axiosPrivate.get('/Accounts', {
          signal: controller.signal
        });
        isMounted && dispatch(getAllExchanges(response.data));
        isMounted && dispatch(getAllAccounts(accountsResponse.data));
      } catch (err) {
        console.error(err);
      }
    }

    getExchanges();
    
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);

  const toggleSubmit = () => {
    setSubmit(prev => !prev);
  };

  return (
    <section>   
      <h2>Exchanges page!</h2>
      <Button onClick={toggleSubmit} text='Add new exchange'/>      
      {submit && <ExchangeAdd />}
      <ExchangesList />      
    </section>
  )
};

export default Exchanges
