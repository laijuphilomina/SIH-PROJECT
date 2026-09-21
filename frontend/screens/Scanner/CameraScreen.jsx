import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    padding: 24,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32', marginBottom: 8 },
  text: { color: '#555', marginBottom: 20, textAlign: 'center' },
  dropzone: {
    width: '100%',
    maxWidth: 480,
    border: '2px dashed #81C784',
    borderRadius: 12,
    padding: 32,
    textAlign: 'center',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  preview: { maxWidth: 320, maxHeight: 320, marginTop: 16, borderRadius: 8 },
  controls: { marginTop: 20, maxWidth: 480, width: '100%' },
};

const CameraScreen = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [imageUri, setImageUri] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setFileName(file.name);
    setImageUri(URL.createObjectURL(file));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Scan a Crop</h1>
      <p style={styles.text}>Upload or capture a photo of the affected plant leaf.</p>

      <div style={styles.dropzone} onClick={() => inputRef.current?.click()}>
        {imageUri ? (
          <img src={imageUri} alt="Selected crop" style={styles.preview} />
        ) : (
          <div>📷 Click to select or capture an image</div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {imageUri ? (
        <div style={styles.controls}>
          <CustomButton title={`Analyze ${fileName}`} onClick={() => navigate('/preview', { state: { imageUri } })} />
        </div>
      ) : null}
    </div>
  );
};

export default CameraScreen;
