import React from 'react';

const styles = {
  container: { minHeight: '100vh', padding: 16, backgroundColor: '#F1F8E9' },
  content: { maxWidth: 720, margin: '0 auto' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32' },
  text: { marginTop: 12, color: '#555', lineHeight: 1.5 },
};

const ProfileScreen = () => (
  <div style={styles.container}>
    <div style={styles.content}>
      <h1 style={styles.title}>Profile</h1>
      <p style={styles.text}>User profile details will appear here.</p>
    </div>
  </div>
);

export default ProfileScreen;
