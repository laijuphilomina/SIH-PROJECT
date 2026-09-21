import React from 'react';

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#c62828' },
  meta: { color: '#555', marginTop: 4 },
  severity: { marginTop: 4, fontWeight: 'bold', color: '#ef6c00' },
  advisory: { marginTop: 8, color: '#333' },
};

const ResultCard = ({ result }) => (
  <div style={styles.card}>
    <div style={styles.title}>{result.disease || result.pest}</div>
    <div style={styles.meta}>Crop: {result.crop}</div>
    <div style={styles.meta}>Confidence: {result.confidence}%</div>
    <div style={styles.severity}>Severity: {result.severity}</div>
    <div style={styles.advisory}>{result.advisory}</div>
  </div>
);

export default ResultCard;
