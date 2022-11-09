import React, { useEffect, useState } from 'react'
import { useDispatch,  } from 'react-redux';
import { getAllTransfers } from '../redux/transferSlice';
import { getAllAccounts } from '../redux/accountSlice';
import TransfersList from '../components/transfers/TransfersList';
import TransferAdd from '../components/transfers/TransferAdd';
import useAxios from '../hooks/useAxios';
import Button from '../ui/Form/Button';


function Transfers() {
  const axiosPrivate = useAxios();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTransfers = async () => {
      try {
        const response = await axiosPrivate.get('/Transfers', {
          signal: controller.signal
        });
        const accountsResponse = await axiosPrivate.get('/Accounts', {
          signal: controller.signal
        });
        isMounted && dispatch(getAllTransfers(response.data));
        isMounted && dispatch(getAllAccounts(accountsResponse.data));
      } catch (err) {
        console.error(err);
      }
    }

    getTransfers();
    
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
      <h2>Transfers page!</h2>
      <Button onClick={toggleSubmit} text='Add new transfer'/>      
      {submit && <TransferAdd />}
      <TransfersList />      
    </section>
  )
};

export default Transfers
