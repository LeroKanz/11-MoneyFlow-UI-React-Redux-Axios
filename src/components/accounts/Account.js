import { useState } from 'react';
import Card from '../../ui/Card';
import { useDispatch, useSelector } from 'react-redux';
import { removeAccount } from '../../redux/accountSlice';
import { axiosPrivate } from '../../api/axios';
import UpdateAccount from './UpdateAccount';
import Li from '../../ui/List';
import Button from '../../ui/Form/Button';


const Account = ({ id, name, accountType, lastFourDigitsOfCard, ...accountsCurrencies }) => {

  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);

  const lookUp = useSelector(state => state.forLookUp.lookUps);
  const accountTypeValue = lookUp.accountType[accountType];

  const toggleSubmit = () => {
    setSubmit(prev => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axiosPrivate.delete(`/Accounts/${id}`);
    dispatch(removeAccount({ id }));
  };  

  return (
    <Li>
      <Card>
        <blockquote>
          <p><i><small>name:</small></i>{name}</p>
          <p><i><small>type:</small></i>{accountTypeValue}</p>
          <p><i><small>card №: ...</small></i>{lastFourDigitsOfCard}</p>
          {accountsCurrencies.accountsCurrencies.map((ac) => 
          (<div key={`${ac.accountId}_${ac.currencyId}`}><p><i><small>amount:</small></i>{ac.amount}</p>
          <p><i><small>currency:</small></i>{lookUp.currencyTypes[ac.currencyId]}</p></div>))}          
        </blockquote>
      </Card>
      <div>
      <Button onClick={submitHandler} text='Delete Account'/>
      <Button onClick={toggleSubmit} text='For Update'/>        
      </div>
      <div>{submit && <UpdateAccount key={id} id={id} />}</div>
    </Li>
  );
};

export default Account;
