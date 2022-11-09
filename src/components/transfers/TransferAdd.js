import { useRef, useState } from 'react';
import Card from '../../ui/Card';
import classes from './TransferAdd.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTransfer } from '../../redux/transferSlice';
import { axiosPrivate } from '../../api/axios';
import LoadingSpinner from '../../ui/LoadingSpinner'
import Select from 'react-select';
import { selectErrors } from '../../errorsHandler/errors';
import { mapToSelectOptions } from '../../api/extensions/mapToSelectOptions';
import Button from '../../ui/Form/Button';


const TransferAdd = () => {
  const dispatch = useDispatch();
  const lookUp = useSelector(state => state.forLookUp.lookUps);
  const accounts = useSelector(state => state.forAccounts.accounts);
  const accountsName = accounts.map(account => ({ value: account.id, label: account.name}));

  const amountInputRef = useRef();

  const currencies = mapToSelectOptions(lookUp.currencyTypes);
 
  const [selectedCurrencyOption, setSelectedCurrencyOption] = useState(null);
  const [selectedAccountOption, setSelectedAccountOption] = useState(null);

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const [submit, setSubmit] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredAccountFromId = selectedAccountOption.value;
    const enteredAccountToId = selectedAccountOption.value;
    const enteredCurrencyId = selectedCurrencyOption.value;
    const enteredAmount = amountInputRef.current.value;

    try {
      setSubmit(true);
      const response = await axiosPrivate.post('/Transfers', {
        accountFromId: enteredAccountFromId, 
        accountToId: enteredAccountToId,
        currencyId: enteredCurrencyId, 
        amount: enteredAmount
      });
      if (response) {
        dispatch(addTransfer(response.data));
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
          <p>Currency Type</p>
          <Select
            defaultValue={selectedCurrencyOption}
            onChange={setSelectedCurrencyOption}
            options={currencies}
            value={selectedCurrencyOption}
          />
        </div>
        <Button onClick={submitHandler} disabled={submit} text='Add Transfer'/>        
      </form>
    </Card>
  );
};

export default TransferAdd;
