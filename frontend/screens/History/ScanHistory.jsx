import React, { useEffect, useState } from 'react';
import localDatabase from '../../database/localDatabase';

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#F1F8E9' },
  content: { maxWidth: 720, margin: '0 auto', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32', marginBottom: 12 },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  name: { fontWeight: 'bold', color: '#333' },
  meta: { color: '#777', fontSize: 12, marginTop: 2 },
  empty: { color: '#777', textAlign: 'center', marginTop: 24 },
};

const ScanHistory = () => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    localDatabase.getScanHistory().then(setScans).catch(() => setScans([]));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Scan History</h1>
        {scans.length === 0 ? (
          <p style={styles.empty}>No scans yet.</p>
        ) : (
          scans.map((item) => (
            <div key={item.id} style={styles.item}>
              <div style={styles.name}>{item.disease || item.pest || 'Unknown'}</div>
              <div style={styles.meta}>
                {item.crop ? `Crop: ${item.crop} · ` : ''}
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScanHistory;
