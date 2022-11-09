import Card from '../../ui/Card';
import { useDispatch, useSelector } from 'react-redux';
import { removeOperation } from '../../redux/operationSlice';
import { axiosPrivate } from '../../api/axios';
import Li from '../../ui/List';
import Button from '../../ui/Form/Button';


const Operation = ({ id, amount, operationType, operationTime, category, account }) => {

  const dispatch = useDispatch();
  const lookUp = useSelector(state => state.forLookUp.lookUps);
  const operationTypeValue = lookUp.operationType[operationType];

  const submitHandler = async (e) => {
    e.preventDefault();
    await axiosPrivate.delete(`/Operations/${id}`);
    dispatch(removeOperation({ id }));
  };

  return (
    <Li>
      <Card>
        <blockquote>
          <p><i><small>amount:</small></i>{amount}</p>
          <p><i><small>type:</small></i>{operationTypeValue}</p>
          <p><i><small>time:</small></i>{operationTime}</p>
          <p><i><small>category:</small></i>{category?.name}</p>
          <p><i><small>account:</small></i>{account?.name}</p>
        </blockquote>
      </Card>
      <Button onClick={submitHandler} text='Delete Operation'/>          
    </Li>
  );
};

export default Operation;