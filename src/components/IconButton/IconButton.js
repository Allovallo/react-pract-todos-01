import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';

const IconButton = ({ children, onClick, ...allyProps }) => {
  return (
    <button type="button" className="IconButton" onClick={onClick} {...allyProps}>
      {children}
    </button>
  );
};

IconButton.defaultPros = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.func,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
