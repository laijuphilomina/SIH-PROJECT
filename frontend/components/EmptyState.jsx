import { Box, Typography, Button, Stack } from '@mui/material';

const EmptyState = ({ icon, title, description, actionLabel, onAction }) => (
  <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
    <Box sx={{ color: 'primary.light', mb: 2 }}>{icon}</Box>
    <Typography variant="h6">{title}</Typography>
    {description ? (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 360, mx: 'auto' }}>
        {description}
      </Typography>
    ) : null}
    {actionLabel ? (
      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      </Stack>
    ) : null}
  </Box>
);

export default EmptyState;
