import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { text, handleClick, id, type } = props;

  return (
    <button
      type="submit"
      className={type}
      id={id}
      onClick={(e) => handleClick(e)}
    >
      { text }
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
