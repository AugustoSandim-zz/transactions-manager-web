import React, {useState} from 'react';

function SignIn() {
  const [data, setData] = useState({email: '', password: ''});
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    credentials: '',
  });
  
  const handleSubmit = async e => {
    e.preventDefault();
    const {username, password} = data;

    if (!username) {
      return setErrors({
        ...errors,
        username: 'Campo obrigatório.',
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
      // await login(data);
      // history.replace(redirectUrl);
    } catch (err) {
      // if (err.status === 403) {
      //   refreshToken();
      //   redirectUserIfAuthenticated();
      //   login(data).then(() => history.replace(redirectUrl));
      // }

      setErrors({
        ...errors,
        credentials:
          'Usuário e/ou senha inválidos. Por favor, verifique e tente novamente.',
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
    <div className="sign-in">
      <h1>Login</h1>
    </div>
  );
}

export default SignIn;
