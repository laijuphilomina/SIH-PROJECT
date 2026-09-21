import { Box, Typography, LinearProgress } from '@mui/material';

const ConfidenceBar = ({ value }) => {
  const color = value >= 70 ? 'success' : value >= 50 ? 'warning' : 'error';

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          AI Confidence
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {value}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        color={color}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
};

export default ConfidenceBar;
