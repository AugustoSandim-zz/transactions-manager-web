import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {register} from '../../services/auth';

function SignUp({history}) {
  const [data, setData] = useState({email: '', password: ''});
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    credentials: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const {email, password} = data;

    if (!email) {
      return setErrors({
        ...errors,
        email: 'Campo obrigatório.',
      });
    }

    if (!password) {
      return setErrors({
        ...errors,
        password: 'Campo obrigatório.',
      });
    }

    setLoading(true);

    try {
      register(data);
      history.push('/');
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
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      credentials: '',
      [e.target.name]: '',
    });
  };

  return (
    <div className="sign-up">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Endereço de e-mail"
          onChange={handleChange}
          required
        />
        {errors.email && <p>{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />
        {errors.password && <p>errors.password</p>}

        <button type="submit">Cadastrar</button>

        {errors.credentials && <p>errors.credentials</p>}

        <Link to="/">Fazer login</Link>
      </form>
    </div>
  );
}

export default withRouter(SignUp);
