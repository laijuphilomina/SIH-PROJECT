import React from 'react';
import { useNavigate } from 'react-router-dom';
import CropCard from '../../components/CropCard';
import CustomButton from '../../components/CustomButton';

const crops = [
  { id: 1, name: 'Wheat', description: 'Rust, blight and common wheat diseases', image: 'https://placehold.co/64x64/dcedc8/33691e?text=Wheat' },
  { id: 2, name: 'Rice', description: 'Blast, blight and pest detection', image: 'https://placehold.co/64x64/c8e6c9/2e7d32?text=Rice' },
  { id: 3, name: 'Cotton', description: 'Bollworm and leaf disease detection', image: 'https://placehold.co/64x64/f1f8e9/558b2f?text=Cotton' },
];

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#F1F8E9' },
  content: { maxWidth: 720, margin: '0 auto', padding: 16 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32', marginBottom: 16 },
  subheading: { fontSize: 16, fontWeight: 'bold', margin: '16px 0 8px', color: '#333' },
  nav: { display: 'flex', gap: 12, marginBottom: 16 },
  navBtn: { width: 'auto' },
};

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to AI Crop & Pest Detection</h1>
        <div style={styles.nav}>
          <div style={{ flex: 1 }}>
            <CustomButton title="Scan a Crop" onClick={() => navigate('/scanner')} />
          </div>
          <div style={{ flex: 1 }}>
            <CustomButton title="Advisory" onClick={() => navigate('/advisory')} style={{ backgroundColor: '#66BB6A' }} />
          </div>
          <div style={{ flex: 1 }}>
            <CustomButton title="History" onClick={() => navigate('/history')} style={{ backgroundColor: '#558B2F' }} />
          </div>
        </div>
        <h2 style={styles.subheading}>Supported Crops</h2>
        {crops.map((crop) => (
          <CropCard key={crop.id} crop={crop} onClick={() => navigate('/scanner')} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
