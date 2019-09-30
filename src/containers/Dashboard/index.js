import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {currentUser} from '../../services/auth';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    const list = JSON.parse(localStorage.getItem(currentUser()));
    // Order by date created
    list.sort((a, b) => new Date(b.created) - new Date(a.created));

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
    return `TOTAL R$ ${calculateTotal()
      .toFixed(2)
      .replace('.', ',')}`;
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <strong>{renderTotalValue()}</strong>
      {transactions ? (
        transactions.map(item => (
          <li key={item.created}>
            {item.description} - {item.transactionValue}
          </li>
        ))
      ) : (
        <>
          <h3>Nenhuma transação cadastrada!</h3>
        </>
      )}
      <Link to="/nova-transacao">Nova transacao</Link>
    </div>
  );
}

export default withRouter(Dashboard);
