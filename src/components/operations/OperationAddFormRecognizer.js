import { useState } from 'react';
import classes from './OperationAdd.module.css';
import Card from '../../ui/Card';
import { axiosPrivate } from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addOperationTotal } from '../../redux/operationFormRecognizerSlice';
import LoadingSpinner from '../../ui/LoadingSpinner'


const OperationAddFromRecognizer = () => {
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState('');

  const [drag, setDrag] = useState(false);
    
  const dragLeaveHandler = (event) => {
    event.preventDefault();
    setDrag(false);
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
    setDrag(true);
  };

  const onDropHandler = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const formData = new FormData();
    formData.append('file', event.dataTransfer.files[0]);    
    const response = await axiosPrivate.post('/Operations/recognize', formData);
    console.log(response);
    dispatch(addOperationTotal(response.data?.total));   
    setSubmit(false);
    setDrag(false);
  };

  return (
    <Card>
      {submit && <LoadingSpinner/>}
      {drag
        ? <div className={classes.drop}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragOverHandler(e)}
        onDrop={e => onDropHandler(e)}>
        Drop it!
      </div>
        : <div className={classes.pull}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragOverHandler(e)}>        
        Drag it here!
        </div>
      } 
    </Card>
  );
};

export default OperationAddFromRecognizer;
