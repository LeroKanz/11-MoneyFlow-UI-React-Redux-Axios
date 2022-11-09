import { useRef, useState } from 'react';
import Card from '../../ui/Card';
import classes from './OperationAdd.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addOperation } from '../../redux/operationSlice';
import { axiosPrivate } from '../../api/axios';
import LoadingSpinner from '../../ui/LoadingSpinner'
import Select from 'react-select';
import { selectErrors } from '../../errorsHandler/errors';
import { mapToSelectOptions } from '../../api/extensions/mapToSelectOptions';
import { addOperationTotal } from '../../redux/operationFormRecognizerSlice';
import Form from '../../ui/Form';
import Lable from '../../ui/Form/Lable';
import Input from '../../ui/Form/Input';
import Button from '../../ui/Form/Button';




const OperationAdd = () => {
  const dispatch = useDispatch();
  const total = useSelector(state => state.forOperationFR.total)
  const lookUp = useSelector(state => state.forLookUp.lookUps);
  const categories = useSelector(state => state.forCategories.categories);
  const accounts = useSelector(state => state.forAccounts.accounts);
  const currencies = mapToSelectOptions(lookUp.currencyTypes);
  const operations = mapToSelectOptions(lookUp.operationType);

  const categoriesName = categories.map(category => ({ value: category.id, label: category.name}));  
  const accountsName = accounts.map(account => ({ value: account.id, label: account.name}));

  const [selectedCurrencyOption, setSelectedCurrencyOption] = useState(null);
  const [totalAmount, setTotalAmount] = useState(total);
  const [selectedOperationOption, setSelectedOperationOption] = useState(null);
  const [selectedAccountOption, setSelectedAccountOption] = useState(null);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const [submit, setSubmit] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setSubmit(true);
      const response = await axiosPrivate.post('/Operations', {
        operationType: selectedOperationOption.value,
        categoryId: selectedCategoryOption.value,
        accountId: selectedAccountOption.value,
        currencyId: selectedCurrencyOption.value,
        amount: totalAmount
      });
      if (response) {
        dispatch(addOperation(response.data));
        setSubmit(false);
        dispatch(addOperationTotal(0));
        setTotalAmount(0);
      }
    } catch (error) {
      setSubmit(false);
      setErrorMsg(selectErrors(error));
      errorRef.current.focus();
    }
  }

  return (
    <Card>
      <p ref={errorRef} className={errorMsg ? `${classes.errormsg}` : `${classes.offscreen}`} aria-live="assertive">{errorMsg}</p>
      {submit && <LoadingSpinner />}
      <Form>
      <form>        
        <p>Category</p>
          <Select
            defaultValue={selectedCategoryOption}
            onChange={setSelectedCategoryOption}
            options={categoriesName}
            value={selectedCategoryOption}
          />
          <p>Account</p>
          <Select
            defaultValue={selectedAccountOption}
            onChange={setSelectedAccountOption}
            options={accountsName}
            value={selectedAccountOption}
          />
          <Lable htmlFor='amount' text={'Amount'}/>          
          <Input type='text' id='amount' value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />        
          <p>Currency Type</p>
          <Select
            defaultValue={selectedCurrencyOption}
            onChange={setSelectedCurrencyOption}
            options={currencies}
            value={selectedCurrencyOption}
          />
          <p>Operation Type</p>
          <Select
            defaultValue={selectedOperationOption}
            onChange={setSelectedOperationOption}
            options={operations}
            value={selectedOperationOption}
          />
          <Button onClick={submitHandler} disabled={submit} text='Add Operation'/>
      </form>
      </Form>
    </Card>
  );
};

export default OperationAdd;
