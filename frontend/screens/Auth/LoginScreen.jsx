import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import authService from '../../services/authService';
import { validateLoginForm } from '../../utils/validation';

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
  link: { display: 'block', textAlign: 'center', marginTop: 16, color: '#2E7D32' },
};

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateLoginForm({ email, password });
    setErrors(formErrors);
    if (Object.keys(formErrors).length) return;

    try {
      setLoading(true);
      await authService.login(email, password);
      navigate('/home', { replace: true });
    } catch (err) {
      setErrors({ form: err.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      <h1 style={styles.title}>Login</h1>
      {errors.form ? <p style={{ color: '#d32f2f' }}>{errors.form}</p> : null}
      <CustomInput label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" error={errors.email} />
      <CustomInput label="Password" value={password} onChange={setPassword} placeholder="Password" type="password" error={errors.password} />
      <CustomButton title={loading ? 'Logging in...' : 'Login'} type="submit" disabled={loading} />
      <Link to="/register" style={styles.link}>Create account</Link>
    </form>
  );
};

export default LoginScreen;
