import { useRef, useState } from 'react';
import Card from '../../ui/Card';
import classes from './AccountAdd.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../../redux/accountSlice';
import { axiosPrivate } from '../../api/axios';
import LoadingSpinner from '../../ui/LoadingSpinner'
import Select from 'react-select';
import { selectErrors } from '../../errorsHandler/errors';
import { mapToSelectOptions } from '../../api/extensions/mapToSelectOptions';
import Button from '../../ui/Form/Button';


const UpdateAccountAdd = ({ id }) => {
  const dispatch = useDispatch();
  const lookUp = useSelector(state => state.forLookUp.lookUps);

  const nameInputRef = useRef();
  const lastFourDigitsOfCardInputRef = useRef();
  const bankAccountNumberInputRef = useRef();
  const amountInputRef = useRef();
  
  const accounts = mapToSelectOptions(lookUp.accountType);

  const [selectedAccountOption, setSelectedAccountOption] = useState(null);

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const [submit, setSubmit] = useState('');


  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredaccountType = selectedAccountOption.value;
    const enteredlastFourDigitsOfCard = lastFourDigitsOfCardInputRef.current.value;
    const enteredbankAccountNumber = bankAccountNumberInputRef.current.value;
    const enteredamount = amountInputRef.current.value;

    try {
      setSubmit(true);
      const response = await axiosPrivate.put(`/Accounts/${id}`,
        {
          name: enteredName, accountType: enteredaccountType,
          lastFourDigitsOfCard: enteredlastFourDigitsOfCard, bankAccountNumber: enteredbankAccountNumber,
          amount: enteredamount
        });
      if (response) {
        dispatch(updateAccount(response.data));
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
          <label htmlFor='name'>Account name</label>
          <input type='text' id='name' ref={nameInputRef} />
          <label htmlFor='lastFourDigitsOfCard'>Last For Digits Of Card</label>
          <input type='text' id='lastFourDigitsOfCard' ref={lastFourDigitsOfCardInputRef} />
          <label htmlFor='bankAccount'> Bank Account Number</label>
          <input type='text' id='bankAccount' ref={bankAccountNumberInputRef} />
          <label htmlFor='amount'>Amount</label>
          <input type='text' id='amount' ref={amountInputRef} />
          <p>Account Type</p>
          <Select
            defaultValue={selectedAccountOption}
            onChange={setSelectedAccountOption}
            options={accounts}
            value={selectedAccountOption}
          />
        </div>
        <Button onClick={submitHandler} disabled={submit} text='Update Account'/>
      </form>
    </Card>
  );
};

export default UpdateAccountAdd;
