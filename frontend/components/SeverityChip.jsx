import { Chip } from '@mui/material';

const severityColors = {
  None: { bgcolor: '#E8F5E9', color: '#2E7D32' },
  Low: { bgcolor: '#FFF8E1', color: '#F57F17' },
  Moderate: { bgcolor: '#FFF3E0', color: '#EF6C00' },
  High: { bgcolor: '#FFEBEE', color: '#C62828' },
};

const SeverityChip = ({ severity, size }) => (
  <Chip
    label={`Severity: ${severity}`}
    size={size}
    sx={severityColors[severity] || severityColors.None}
  />
);

export default SeverityChip;
