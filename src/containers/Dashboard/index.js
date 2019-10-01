import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {currentUser} from '../../services/auth';
import './styles.scss';
import Item from '../../components/Item';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const orderByCreated = list => {
    return (
      list && list.sort((a, b) => new Date(b.created) - new Date(a.created))
    );
  };

  const fetchTransactions = () => {
    const list = JSON.parse(localStorage.getItem(currentUser()));
    orderByCreated(list);

    return setTransactions(list);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const calculateTotal = () => {
    if (!transactions) return 0;

    return transactions.reduce((acc, item) => {
      return (
        Number(acc) +
        Number(item.transactionValue.replace('R$', '').replace(',', '.'))
      );
    }, 0);
  };

  const renderTotalValue = () => {
    return `R$ ${calculateTotal()
      .toFixed(2)
      .replace('.', ',')}`;
  };

  return (
    <div className="dashboard">
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
