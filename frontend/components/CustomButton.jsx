import React from 'react';

const styles = {
  button: {
    backgroundColor: '#2E7D32',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    padding: '12px 20px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  disabled: { opacity: 0.5, cursor: 'not-allowed' },
};

const CustomButton = ({ title, onClick, style, disabled, type = 'button' }) => (
  <button
    type={type}
    style={{ ...styles.button, ...style, ...(disabled ? styles.disabled : {}) }}
    onClick={onClick}
    disabled={disabled}
  >
    {title}
  </button>
);

export default CustomButton;
