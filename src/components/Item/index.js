import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Item({value, description, className}) {
  return (
    <div className={`item ${className}`}>
      <div className="item__icon">
        <i className="fa fa-money" aria-hidden="true" />
      </div>
      <div className="item__description">
        <p>{description}</p>
      </div>
      <div className="item__value">{value}</div>
    </div>
  );
}

Item.propTypes = {
  /* set value text */
  value: PropTypes.string.isRequired,
  /* set value text */
  description: PropTypes.string.isRequired,
  /* extends button class */
  className: PropTypes.string,
};

Item.defaultProps = {
  className: '',
};

export default Item;
