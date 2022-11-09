import Card from '../../ui/Card';
import { useDispatch } from 'react-redux';
import { removeTransfer } from '../../redux/transferSlice';
import { axiosPrivate } from '../../api/axios';
import Li from '../../ui/List';
import Button from '../../ui/Form/Button';


const Transfer = ({ id, amount, operationTime, accountFrom, accountTo }) => {

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    await axiosPrivate.delete(`/Transfers/${id}`);
    dispatch(removeTransfer({ id }));
  };  

  return (
    <Li>
      <Card>
        <blockquote>
          <p><i><small>amount:</small></i>{amount}</p>
          <p><i><small>time:</small></i>{operationTime}</p>
          <p><i><small>AccountFrom:</small></i>{accountFrom?.name}</p>
          <p><i><small>AccountTo:</small></i>{accountTo?.name}</p>
        </blockquote>
      </Card>
      <Button onClick={submitHandler} text='Delete Transfer'/>         
    </Li>
  );
};

export default Transfer;
