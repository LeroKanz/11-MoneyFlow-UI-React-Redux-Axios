import { useRef } from 'react';
import Card from '../../ui/Card';
import classes from './CategoryAdd.module.css';
import { useDispatch, } from 'react-redux';
import { addCategory } from '../../redux/categorySlice';
import { axiosPrivate } from '../../api/axios';
import { useParams } from "react-router-dom";
import Button from '../../ui/Form/Button';


const CategoryAdd = () => {
  const nameInputRef = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;

    const response = await axiosPrivate.post('/Categories', { name: enteredName, parentCategoryId: id });
    dispatch(addCategory({ name: enteredName, parentCategoryId: id }));
    }

    return (
      <Card>
        <form className={classes.form}>
          <div className={classes.control}>
            <label htmlFor='name'>Category name</label>
            <input type='text' id='name' ref={nameInputRef} />
          </div>
          <Button onClick={submitHandler} text='Add Category'/>          
        </form>
      </Card>
    );
  };

  export default CategoryAdd;
