import { Box, Typography, CircularProgress, keyframes } from '@mui/material';

const scanLine = keyframes`
  0% { top: 8%; }
  50% { top: 88%; }
  100% { top: 8%; }
`;

const LoadingAnimation = ({ imageUri }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Box
      sx={{
        position: 'relative',
        width: { xs: 240, sm: 300 },
        height: { xs: 240, sm: 300 },
        mx: 'auto',
        borderRadius: 4,
        overflow: 'hidden',
        bgcolor: '#F4FAF4',
        boxShadow: '0 2px 10px rgba(27,94,32,0.15)',
      }}
    >
      {imageUri ? (
        <Box
          component="img"
          src={imageUri}
          alt="Analyzing crop"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : null}
      {/* Animated scan line */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, transparent, #2E7D32, transparent)',
          boxShadow: '0 0 12px 2px rgba(46,125,50,0.55)',
          animation: `${scanLine} 2s ease-in-out infinite`,
        }}
      />
      {/* Corner brackets */}
      {['top:8px;left:8px', 'top:8px;right:8px', 'bottom:8px;left:8px', 'bottom:8px;right:8px'].map(
        (pos) => (
          <Box
            key={pos}
            sx={{
              position: 'absolute',
              width: 28,
              height: 28,
              borderStyle: 'solid',
              borderColor: 'primary.main',
              style: pos.split(';').reduce((acc, s) => {
                const [k, v] = s.split(':');
                acc[k] = v;
                return acc;
              }, {}),
              ...(pos.includes('top') ? { top: 8 } : { bottom: 8 }),
              ...(pos.includes('left') ? { left: 8 } : { right: 8 }),
              borderRightWidth: pos.includes('right') ? 3 : 0,
              borderLeftWidth: pos.includes('left') ? 3 : 0,
              borderTopWidth: pos.includes('top') ? 3 : 0,
              borderBottomWidth: pos.includes('bottom') ? 3 : 0,
            }}
          />
        )
      )}
    </Box>

    <CircularProgress size={28} sx={{ mt: 4, color: 'primary.main' }} />
    <Typography variant="h6" sx={{ mt: 2 }}>
      Analyzing your crop...
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
      AI is checking for possible diseases and pests.
    </Typography>
  </Box>
);

export default LoadingAnimation;
