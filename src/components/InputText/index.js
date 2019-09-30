import React from 'react';
import PropTypes from 'prop-types';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import InputMask from 'react-input-mask';
import IntlCurrencyInput from 'react-intl-currency-input';

import './styles.scss';

function InputText({
  className,
  children,
  error,
  name,
  mask,
  onChange,
  placeholder,
  type,
  value,
  required,
  id,
  input,
  currency,
  meta: {error: validateError, touched} = {},
}) {
  const hasError = validateError && touched || error;
  const currencyConfig = {
    locale: 'pt-BR',
    formats: {
      number: {
        BRL: {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };
  
  const textInput = () => {
    return currency ? (
      <>
        <IntlCurrencyInput
          currency="BRL"
          onChange={onChange}
          config={currencyConfig}
          name={name}
          className={`input-text__input ${className} ${
            hasError ? 'error' : ''
          }`}
          placeholder={placeholder}
          type={type}
          required={required}
          value={value}
          id={id}
          {...input}
        />
      </>
    ) : (
      <>
        <InputMask
          mask={mask}
          onChange={onChange}
          name={name}
          className={`input-text__input ${className} ${
            hasError ? 'error' : ''
          }`}
          placeholder={placeholder}
          type={type}
          required={required}
          value={value}
          id={id}
          {...input}
        />
        {children}
      </>
    );
  };

  return (
    <div className="input-text">
      {textInput()}

      {hasError && (
        <small className="input-text__error">
          {/* <FontAwesomeIcon icon="exclamation-triangle" size="xs" /> */}
          {validateError || error}
        </small>
      )}
    </div>
  );
}

InputText.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  currency: PropTypes.bool,
};

InputText.defaultProps = {
  className: '',
  error: '',
  name: '',
  onChange: () => {},
  placeholder: '',
  type: 'text',
  currency: false,
};

export default InputText;
