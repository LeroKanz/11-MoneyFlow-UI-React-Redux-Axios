import React, { useEffect, useState } from 'react'
import { useDispatch,  } from 'react-redux';
import { getAllAccounts } from '../redux/accountSlice';
import AccountsList from '../components/accounts/AccountsList';
import AccountAdd from '../components/accounts/AccountAdd';
import useAxios from '../hooks/useAxios';
import Button from '../ui/Form/Button';


function Accounts() {
  const axiosPrivate = useAxios();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [forceReload, setForceReload] = useState({});

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAccounts = async () => {
      try {
        const response = await axiosPrivate.get('/Accounts', {
          signal: controller.signal
        });
        isMounted && dispatch(getAllAccounts(response.data));
      } catch (err) {
        console.error(err);
      }
    }

    getAccounts();
    
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [forceReload]);

  const toggleSubmit = () => {
    setSubmit(prev => !prev);
  };

  return (
    <section>   
      <h2>Accounts page!</h2>
      <Button onClick={toggleSubmit} text='Add new account'/>      
      {submit && <AccountAdd setForceReload={setForceReload}/>}
      <AccountsList />      
    </section>
  )
}

export default Accounts
