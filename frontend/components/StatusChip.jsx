import { Chip } from '@mui/material';

const statusColors = {
  'AI Detected': { bgcolor: '#E3F2FD', color: '#0277BD' },
  'Pending Expert Review': { bgcolor: '#FFF8E1', color: '#F57F17' },
  'Expert Verified': { bgcolor: '#E8F5E9', color: '#2E7D32' },
  'Pending Review': { bgcolor: '#FFF8E1', color: '#F57F17' },
  Resolved: { bgcolor: '#E8F5E9', color: '#2E7D32' },
};

const StatusChip = ({ status, size }) => (
  <Chip label={status} size={size} sx={statusColors[status] || statusColors['AI Detected']} />
);

export default StatusChip;
