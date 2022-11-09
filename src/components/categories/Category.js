import { useRef } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { removeCategory, updateCategory } from '../../redux/categorySlice';
import { axiosPrivate } from '../../api/axios';
import Li from '../../ui/List';
import Button from '../../ui/Form/Button';


const Category = ({ id, name }) => {
  const dispatch = useDispatch();
  const nameUpdateRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axiosPrivate.delete(`/Categories/${id}`);
    dispatch(removeCategory({ id }));
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    const updatedName = nameUpdateRef.current.value;
    const response = await axiosPrivate.put(`/Categories/${id}`,
    {
      name: updatedName
    });
    dispatch(updateCategory(response.data));
  };
    
  return (
    <Li>
      <blockquote>
        <p>{name}</p>
      </blockquote>
      <div>
      <Button onClick={submitHandler} text={'Delete Category'}/>        
        <Link to={`/children-categories/${id}`} className='btn'>Get Children</Link>
        <Button onClick={submitUpdateHandler} text='Update Category'/>          
          <div>
            <label htmlFor='name'>update</label>
            <input type='text' id='name' ref={nameUpdateRef} />
          </div>
      </div>
    </Li>
  );
};

export default Category;
