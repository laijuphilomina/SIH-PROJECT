import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import authService from '../../services/authService';
import { validateRegisterForm } from '../../utils/validation';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 400,
    margin: '0 auto',
    padding: 24,
    backgroundColor: '#F1F8E9',
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2E7D32', marginBottom: 24, textAlign: 'center' },
};

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateRegisterForm({ name, email, password });
    setErrors(formErrors);
    if (Object.keys(formErrors).length) return;

    try {
      setLoading(true);
      await authService.register(name, email, password);
      navigate('/home', { replace: true });
    } catch (err) {
      setErrors({ form: err.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      <h1 style={styles.title}>Register</h1>
      {errors.form ? <p style={{ color: '#d32f2f' }}>{errors.form}</p> : null}
      <CustomInput label="Name" value={name} onChange={setName} placeholder="Full name" error={errors.name} />
      <CustomInput label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" error={errors.email} />
      <CustomInput label="Password" value={password} onChange={setPassword} placeholder="Password" type="password" error={errors.password} />
      <CustomButton title={loading ? 'Registering...' : 'Register'} type="submit" disabled={loading} />
    </form>
  );
};

export default RegisterScreen;
