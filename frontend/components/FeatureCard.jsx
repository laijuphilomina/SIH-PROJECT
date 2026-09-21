import { Card, CardActionArea, CardContent, Box, Typography } from '@mui/material';

const FeatureCard = ({ icon, title, description, onClick }) => (
  <Card sx={{ height: '100%' }}>
    <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
      <CardContent sx={{ textAlign: 'center', py: 3 }}>
        <Box
          sx={{
            display: 'inline-flex',
            p: 1.5,
            borderRadius: '50%',
            bgcolor: 'secondary.light',
            color: 'primary.dark',
            mb: 1.5,
          }}
        >
          {icon}
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {description ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        ) : null}
      </CardContent>
    </CardActionArea>
  </Card>
);

export default FeatureCard;
