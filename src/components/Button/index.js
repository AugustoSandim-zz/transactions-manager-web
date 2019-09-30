import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Button({children, className, isLoading, disabled, onClick, type}) {
  return (
    <button
      className={`button ${
        isLoading || disabled ? 'button--disabled' : ''
      } ${className}`}
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  /* set button text */
  children: PropTypes.string.isRequired,

  /* extends button class */
  className: PropTypes.string,

  /* disable button when loading */
  isLoading: PropTypes.bool,

  /* disable button */
  disabled: PropTypes.bool,

  /* handle button click */
  onClick: PropTypes.func,

  /* set button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  className: '',
  isLoading: false,
  disabled: false,
  onClick: () => {},
  type: 'button',
};

export default Button;
