import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {currentUser} from '../../services/auth';
import InputText from '../../components/InputText';
import Button from '../../components/Button';

/**
 * Transactions
 * code ID
 * type of payment (debit or credit)
 * value
 * description
 * status (Processing, Success and Failed)
 */

function NewTransaction({history}) {
  const [data, setData] = useState({
    transactionValue: '',
    transactionType: 'debit',
    description: '',
    created: '',
  });
  const [isLoading, setLoading] = useState(false);
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
    setLoading(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const {transactionValue, transactionType, description} = data;

    if (!transactionValue.replace(/[^\d]/g, '')) {
      return showError({transactionValue: 'Digite o valor'});
    }

    if (!transactionType) {
      return showError({
        transactionValue: 'Selecione um tipo para a transação',
      });
    }

    if (!description) {
      return showError({description: 'Digite uma descrição.'});
    }

    return setMessage('Transação cadastrada com sucesso!');
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
      <button onClick={() => history.goBack()}>Voltar</button>
      <h1>Cadastrar nova transação</h1>
      <form onSubmit={handleSubmit}>
        {message && <p>{message}</p>}
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
          <label htmlFor="type">
            Tipo do pagamento
            <select
              name="transactionType"
              onChange={handleChange}
              error={errors.transactionType}
            >
              <option value="debit">Débito</option>
              <option value="credit">Credito</option>
            </select>
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
  );
}

export default withRouter(NewTransaction);
