import React, { useEffect, useState } from 'react'
import { useDispatch,  } from 'react-redux';
import { getAllOperations } from '../redux/operationSlice';
import { getAllCategories } from '../redux/categorySlice';
import { getAllAccounts } from '../redux/accountSlice';
import OperationsList from '../components/operations/OperationsList';
import OperationAdd from '../components/operations/OperationAdd';
import useAxios from '../hooks/useAxios';
import OperationAddFromRecognizer from '../components/operations/OperationAddFormRecognizer';
import Button from '../ui/Form/Button';


function Operations() {
  const axiosPrivate = useAxios();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getInitialData = async () => {
      try {
        const operationResponse = await axiosPrivate.get('/Operations', {
          signal: controller.signal
        });
        const categoriesResponse = await axiosPrivate.get('/Categories', {
          signal: controller.signal
        });
        const accountsResponse = await axiosPrivate.get('/Accounts', {
          signal: controller.signal
        });
        isMounted && dispatch(getAllOperations(operationResponse.data));
        isMounted && dispatch(getAllCategories(categoriesResponse.data));
        isMounted && dispatch(getAllAccounts(accountsResponse.data));
      } catch (err) {
        console.error(err);
      }
    }

    getInitialData();
    
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
      <h2>Operations page!</h2>
      <Button onClick={toggleSubmit} text='Add new operation'/>
      {submit && <OperationAdd />}
      <OperationsList />
      <OperationAddFromRecognizer />
    </section>
  )
};

export default Operations
