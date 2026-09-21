import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Grid, Stack, Chip, Button, Divider,
  LinearProgress,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import { outbreakAlerts } from '../data/mockData';

const riskColors = {
  High: { bgcolor: '#FFEBEE', color: '#C62828' },
  Moderate: { bgcolor: '#FFF8E1', color: '#F57F17' },
  Low: { bgcolor: '#E8F5E9', color: '#2E7D32' },
};

const riskBarColor = { High: 'error', Moderate: 'warning', Low: 'success' };

const AlertCard = ({ alert }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: riskColors[alert.riskLevel].color }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Box>
            <Typography variant="h6">{alert.disease}</Typography>
            <Typography variant="body2" color="text.secondary">{alert.crop}</Typography>
          </Box>
          <Chip label={`${alert.riskLevel} Risk`} size="small" sx={riskColors[alert.riskLevel]} />
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">Outbreak Probability</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>{alert.riskScore}%</Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={alert.riskScore}
            color={riskBarColor[alert.riskLevel]}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Stack spacing={0.75} sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">Risk window: {alert.window}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">{alert.area}</Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
          Why this prediction
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {alert.reason}
        </Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 2, mb: 0.5 }}>
          Recommended precautions
        </Typography>
        <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 3 }}>
          {alert.actions.map((a) => (
            <Typography key={a} component="li" variant="body2">{a}</Typography>
          ))}
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 2.5 }}>
          <Button size="small" variant="outlined" color="success" startIcon={<CameraAltIcon />} onClick={() => navigate('/scan')}>
            Scan Proactively
          </Button>
          <Button size="small" variant="outlined" color="inherit" startIcon={<SupportAgentIcon />} onClick={() => navigate('/expert')}>
            Ask Expert
          </Button>
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
          Issued {alert.issued}
        </Typography>
      </CardContent>
    </Card>
  );
};

const OutbreakAlerts = () => (
  <Stack spacing={3}>
    <Box>
      <Typography variant="h4">Predictive Outbreak Alerts</Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
        AI weather + scan-pattern forecasting warns you <strong>before</strong> symptoms appear in your field.
      </Typography>
    </Box>

    <Card sx={{ bgcolor: '#FFF8E1', borderLeft: '6px solid', borderColor: 'warning.main' }}>
      <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <WarningAmberIcon sx={{ color: 'warning.main', mt: 0.5 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            1 High-risk alert active for your area
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Predictions combine local weather, humidity trends, and anonymized scan patterns
            from farms near you. Acting early is far cheaper than curing late.
          </Typography>
        </Box>
      </CardContent>
    </Card>

    <Grid container spacing={3}>
      {outbreakAlerts.map((alert) => (
        <Grid item xs={12} md={6} key={alert.id}>
          <AlertCard alert={alert} />
        </Grid>
      ))}
    </Grid>
  </Stack>
);

export default OutbreakAlerts;
