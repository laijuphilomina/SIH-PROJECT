import React from 'react';

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    border: 'none',
    textAlign: 'left',
    width: '100%',
  },
  image: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#eee', objectFit: 'cover' },
  info: { marginLeft: 12, flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16, color: '#2E7D32' },
  desc: { color: '#666', fontSize: 13, marginTop: 4 },
};

const CropCard = ({ crop, onClick }) => (
  <button style={styles.card} onClick={onClick}>
    <img src={crop.image} alt={crop.name} style={styles.image} />
    <div style={styles.info}>
      <div style={styles.name}>{crop.name}</div>
      <div style={styles.desc}>{crop.description}</div>
    </div>
  </button>
);

export default CropCard;
