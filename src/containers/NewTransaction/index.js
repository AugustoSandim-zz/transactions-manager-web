import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Button from '../../components/Button';
import InputText from '../../components/InputText';
import {currentUser} from '../../services/auth';
import './styles.scss';

function NewTransaction({history}) {
  const [data, setData] = useState({
    transactionValue: '',
    description: '',
    created: '',
  });
  const [errors, setErrors] = useState({
    transactionValue: '',
    transactionType: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    currentUser();
  }, []);

  const showError = obj => {
    setErrors(obj);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const {transactionValue, description} = data;

    if (!transactionValue.replace(/[^\d]/g, '')) {
      return showError({transactionValue: 'Favor digite um valor ;)'});
    }

    if (!description) {
      return showError({description: 'Digite uma descrição.'});
    }

    try {
      const transactions =
        JSON.parse(localStorage.getItem(currentUser())) || [];
      transactions.push(data);

      localStorage.setItem(currentUser(), JSON.stringify(transactions));

      setMessage('Transação cadastrada com sucesso!');
    } catch (error) {
      return setMessage('Erro ao salvar transação, tente novamente!');
    }
  };

  const handleClick = () => {
    setData({
      ...data,
      created: new Date(),
    });
  };

  const handleCurrencyChange = (e, value, maskedValue) => {
    setData({
      ...data,
      transactionValue: maskedValue,
    });

    setErrors({
      ...errors,
      transactionValue: '',
    });
  };

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  return (
    <div className="new-transaction">
      <Link to="/dashboard" title="Voltar para dashboard" className="new-transaction--back">
        <i className="fa fa-chevron-left" aria-hidden="true" /> Voltar
      </Link>

      <div className="new-transaction__container">
        <h1>Cadastrar nova transação</h1>
        <form onSubmit={handleSubmit}>
          {message && <p className="new-transaction--success">{message}</p>}
          <div>
            <label htmlFor="transactionValue">
              Valor da transação
              <InputText
                currency
                type="currency"
                placeholder="Valor"
                id="transactionValue"
                name="transactionValue"
                onChange={handleCurrencyChange}
                error={errors.transactionValue}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              Descrição
              <InputText
                type="text"
                placeholder="Descrição"
                id="description"
                name="description"
                onChange={handleChange}
                error={errors.description}
              />
            </label>
          </div>

          <Button type="submit" onClick={handleClick}>
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(NewTransaction);
