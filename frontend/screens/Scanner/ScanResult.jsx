import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../../components/ResultCard';
import CustomButton from '../../components/CustomButton';
import aiService from '../../services/aiService';
import localDatabase from '../../database/localDatabase';

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#F1F8E9' },
  content: { maxWidth: 640, margin: '0 auto', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32', marginBottom: 16 },
  spinner: {
    width: 36,
    height: 36,
    border: '4px solid #c8e6c9',
    borderTopColor: '#2E7D32',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '24px auto',
  },
};

const ScanResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUri = location.state?.imageUri;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const data = await aiService.analyzeImage(imageUri);
        if (!cancelled) {
          setResult(data);
          await localDatabase.saveScan({ ...data, imageUri });
        }
      } catch (e) {
        if (!cancelled) {
          setResult({
            disease: 'Analysis failed',
            crop: '-',
            confidence: 0,
            severity: '-',
            advisory: e.message || 'Try again',
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [imageUri]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Scan Result</h1>
        {imageUri ? (
          <img src={imageUri} alt="Scanned crop" style={{ maxWidth: 320, borderRadius: 8, marginBottom: 16 }} />
        ) : null}
        {loading ? <div style={styles.spinner} /> : null}
        {result ? (
          <>
            <ResultCard result={result} />
            <CustomButton title="Scan Another" onClick={() => navigate('/scanner')} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ScanResult;
