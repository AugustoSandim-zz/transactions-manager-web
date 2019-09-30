import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {login, isAuthenticated} from '../../services/auth';

function Register({history}) {
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    credentials: '',
  });

  useEffect(() => {
    if(isAuthenticated()) history.replace('/dashboard');
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email) {
      return setErrors({
        ...errors,
        email: 'Campo obrigatório.',
      });
    }

    setLoading(true);

    try {
      login(email);
      history.push('/dashboard');
    } catch (err) {
      setErrors({
        ...errors,
        credentials: 'Erro ao efetuar cadastro, tente novamente!',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setEmail(e.target.value);
    setErrors({
      ...errors,
      credentials: '',
      [e.target.name]: '',
    });
  };

  return (
    <div className="sign-up">
      <h1>Cadastro de transações</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Endereço de e-mail"
          onChange={handleChange}
          required
        />
        {errors.email && <p>{errors.email}</p>}

        <button type="submit">Acessar</button>

        {errors.credentials && <p>errors.credentials</p>}
      </form>
    </div>
  );
}

export default withRouter(Register);
