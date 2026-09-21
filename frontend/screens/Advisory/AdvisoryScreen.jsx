import React from 'react';

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#F1F8E9' },
  content: { maxWidth: 720, margin: '0 auto', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32' },
  text: { marginTop: 12, color: '#555', lineHeight: 1.5 },
};

const AdvisoryScreen = () => (
  <div style={styles.container}>
    <div style={styles.content}>
      <h1 style={styles.title}>Advisory</h1>
      <p style={styles.text}>
        Personalized crop advisory and treatment recommendations will appear here
        based on your latest scan results.
      </p>
    </div>
  </div>
);

export default AdvisoryScreen;
