import { useRef, useState } from 'react';
import Card from '../../ui/Card';
import classes from './ExchangeAdd.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addExchange } from '../../redux/exchangeSlice';
import { axiosPrivate } from '../../api/axios';
import LoadingSpinner from '../../ui/LoadingSpinner'
import Select from 'react-select';
import { selectErrors } from '../../errorsHandler/errors';
import { mapToSelectOptions } from '../../api/extensions/mapToSelectOptions';
import Button from '../../ui/Form/Button';


const ExchangeAdd = () => {
  const dispatch = useDispatch();
  const lookUp = useSelector(state => state.forLookUp.lookUps);
  const accounts = useSelector(state => state.forAccounts.accounts);
  const accountsName = accounts.map(account => ({ value: account.id, label: account.name}));

  const amountInputRef = useRef();

  const currencies = mapToSelectOptions(lookUp.currencyTypes);
  const [selectedAccountOption, setSelectedAccountOption] = useState(null);

  const [selectedCurrencyIdFromOption, setSelectedCurrencyIdFromOption] = useState(null);
  const [selectedCurrencyIdToOption, setSelectedCurrencyIdToOption] = useState(null);

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const [submit, setSubmit] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredAccountIdFrom = selectedAccountOption.value;
    const enteredAccountIdTo = selectedAccountOption.value;
    const enteredCurrencyIdFrom = selectedCurrencyIdFromOption.value;
    const enteredCurrencyIdTo = selectedCurrencyIdToOption.value;
    const enteredAmount = amountInputRef.current.value;

    try {
      setSubmit(true);
      const response = await axiosPrivate.post('/Exchanges', {
        accountIdFrom: enteredAccountIdFrom, 
        accountIdTo: enteredAccountIdTo,
        currencyFrom: enteredCurrencyIdFrom, 
        currencyTo: enteredCurrencyIdTo, 
        amount: enteredAmount
      });
      if (response) {
        dispatch(addExchange(response.data));
        setSubmit(false);
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
      <form className={classes.form}>
        <div className={classes.control}>          
        <p>Account From</p>
          <Select
            defaultValue={selectedAccountOption}
            onChange={setSelectedAccountOption}
            options={accountsName}
            value={selectedAccountOption}
          />
          <p>Account To</p>
          <Select
            defaultValue={selectedAccountOption}
            onChange={setSelectedAccountOption}
            options={accountsName}
            value={selectedAccountOption}
          />
          <label htmlFor='amount'>Amount</label>
          <input type='text' id='amount' ref={amountInputRef} />
          <p>CurrencyIdFrom</p>
          <Select
            defaultValue={selectedCurrencyIdFromOption}
            onChange={setSelectedCurrencyIdFromOption}
            options={currencies}
            value={selectedCurrencyIdFromOption}
          />
          <p>CurrencyIdTo</p>
          <Select
            defaultValue={selectedCurrencyIdToOption}
            onChange={setSelectedCurrencyIdToOption}
            options={currencies}
            value={selectedCurrencyIdToOption}
          />
        </div>
        <Button onClick={submitHandler} disabled={submit} text='Add Exchange'/>        
      </form>
    </Card>
  );
};

export default ExchangeAdd;
