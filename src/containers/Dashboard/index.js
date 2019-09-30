import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions([
      {name: 'Transação 1'},
      {name: 'Transação 2'},
      {name: 'Transação 3'},
      {name: 'Transação 4'},
      {name: 'Transação 5'},
    ]);
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {transactions && transactions.map(item => <li>{item.name}</li>)}
      <Link to="/nova-transacao">Nova transacao</Link>
    </div>
  );
}

export default withRouter(Dashboard);
