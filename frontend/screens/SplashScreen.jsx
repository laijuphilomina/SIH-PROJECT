import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2E7D32' },
  spinner: {
    marginTop: 24,
    width: 36,
    height: 36,
    border: '4px solid #c8e6c9',
    borderTopColor: '#2E7D32',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login', { replace: true }), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.title}>AI Crop & Pest Detection</div>
      <div style={styles.spinner} />
    </div>
  );
};

export default SplashScreen;
