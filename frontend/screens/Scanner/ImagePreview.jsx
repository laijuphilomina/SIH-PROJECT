import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    padding: 24,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32', marginBottom: 16 },
  image: { maxWidth: 480, maxHeight: 480, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' },
  controls: { marginTop: 24, display: 'flex', gap: 12, width: '100%', maxWidth: 480 },
  btnWrap: { flex: 1 },
};

const ImagePreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageUri = location.state?.imageUri;

  if (!imageUri) {
    return (
      <div style={styles.container}>
        <p>No image selected.</p>
        <div style={styles.controls}>
          <CustomButton title="Go to Scanner" onClick={() => navigate('/scanner')} />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Preview</h1>
      <img src={imageUri} alt="Crop preview" style={styles.image} />
      <div style={styles.controls}>
        <div style={styles.btnWrap}>
          <CustomButton title="Analyze" onClick={() => navigate('/result', { state: { imageUri } })} />
        </div>
        <div style={styles.btnWrap}>
          <CustomButton title="Retake" onClick={() => navigate('/scanner')} style={{ backgroundColor: '#757575' }} />
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
