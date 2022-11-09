import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Operation from './Operation';
import classes from './OperationsList.module.css';

const OperationsList = () => {
  const operations = useSelector(state => state.forOperations.operations);  
  
  return (
    <Fragment>
      <ul className={classes.list}>
        {operations.map((operation) => (
          <Operation
            key={operation.id}
            {...operation}            
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default OperationsList;
