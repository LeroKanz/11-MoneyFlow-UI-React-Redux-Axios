import Card from '../../ui/Card';
import { useDispatch, useSelector } from 'react-redux';
import { removeExchange } from '../../redux/exchangeSlice';
import { axiosPrivate } from '../../api/axios';
import Li from '../../ui/List';
import Button from '../../ui/Form/Button';



const Exchange = ({ id, amountFrom, amountTo, dateTime, accountFrom, accountTo, currencyFromId, currencyToId }) => {

  const dispatch = useDispatch();
  const lookUp = useSelector(state => state.forLookUp.lookUps);
  const currencyFromIdValue = lookUp.currencyTypes[currencyFromId];
  const currencyToIdValue = lookUp.currencyTypes[currencyToId];




  const submitHandler = async (e) => {
    e.preventDefault();
    await axiosPrivate.delete(`/Exchanges/${id}`);
    dispatch(removeExchange({ id }));
  };  

  return (
    <Li>
      <Card>
        <blockquote>
          <p><i><small>amountFrom:</small></i>{amountFrom}</p>
          <p><i><small>amountTo:</small></i>{amountTo}</p>
          <p><i><small>OperationTime:</small></i>{dateTime}</p>
          <p><i><small>CurrencyFrom:</small></i>{currencyFromIdValue}</p>
          <p><i><small>CurrencyTo:</small></i>{currencyToIdValue}</p>
          <p><i><small>AccountFrom:</small></i>{accountFrom?.name}</p>
          <p><i><small>AccountTo:</small></i>{accountTo?.name}</p>
        </blockquote>
      </Card>
      <Button onClick={submitHandler} text='Delete Exchange'/>      
    </Li>
  );
};

export default Exchange;
