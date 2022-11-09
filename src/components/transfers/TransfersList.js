import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Transfer from './Transfer';
import classes from './TransfersList.module.css';

const TransfersList = () => {
  const transfers = useSelector(state => state.forTransfers.transfers);
  
  return (
    <Fragment>
      <ul className={classes.list}>
        {transfers.map((transfer) => (
          <Transfer
            key={transfer.id}
            {...transfer}            
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default TransfersList;
