import React from 'react';

const styles = {
  container: { marginBottom: 14 },
  label: { display: 'block', fontSize: 14, marginBottom: 4, color: '#333' },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: 8,
    fontSize: 15,
  },
  inputError: { borderColor: '#d32f2f' },
  error: { color: '#d32f2f', fontSize: 12, marginTop: 4 },
};

const CustomInput = ({ label, value, onChange, placeholder, type = 'text', error }) => (
  <div style={styles.container}>
    {label ? <label style={styles.label}>{label}</label> : null}
    <input
      style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
    />
    {error ? <div style={styles.error}>{error}</div> : null}
  </div>
);

export default CustomInput;
