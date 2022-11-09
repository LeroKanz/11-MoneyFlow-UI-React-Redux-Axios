import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Exchange from './Exchange';
import classes from './ExchangesList.module.css';

const ExchangesList = () => {
  const exchanges = useSelector(state => state.forExchanges.exchanges);
  
  return (
    <Fragment>
      <ul className={classes.list}>
        {exchanges.map((exchange) => (
          <Exchange
            key={exchange.id}
            {...exchange}            
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default ExchangesList;
