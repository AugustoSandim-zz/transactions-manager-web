import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Item from '../../components/Item';
import {currentUser, logout} from '../../services/auth';
import {calculateTotal} from '../../utils/calculateAmount';
import {orderByCreated} from '../../utils/orderListByCreateAt';
import './styles.scss';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    const list = JSON.parse(localStorage.getItem(currentUser()));
    orderByCreated(list);

    return setTransactions(list);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const renderTotalValue = () => {
    return `R$ ${calculateTotal(transactions)
      .toFixed(2)
      .replace('.', ',')}`;
  };

  return (
    <div className="dashboard">
      <Link className="dashboard--logout" to="/" onClick={() => logout()}>
        Sair
      </Link>
      <h1 className="dashboard__title">Dashboard</h1>

      <strong className="dashboard__amount">
        <span>Total</span>
        <br />
        {renderTotalValue()}
      </strong>

      <div className="dashboard__container">
        <div className="dashboard__list">
          {transactions ? (
            transactions.map(item => (
              <Item
                key={item.created}
                value={item.transactionValue}
                description={item.description}
              />
            ))
          ) : (
            <div className="dashboard__list--empty">
              <h3>Nenhuma transação cadastrada!</h3>
            </div>
          )}
        </div>
      </div>

      <Link
        to="/nova-transacao"
        className="dashboard__new-transaction"
        title="Criar nova transação"
      >
        <i className="fa fa-plus" />
      </Link>
    </div>
  );
}

export default withRouter(Dashboard);
