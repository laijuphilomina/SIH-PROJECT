import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Button, Grid, Stack,
  CardActionArea, Chip, Divider,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HistoryIcon from '@mui/icons-material/History';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SyncIcon from '@mui/icons-material/Sync';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InsightsIcon from '@mui/icons-material/Insights';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CampaignIcon from '@mui/icons-material/Campaign';

import FeatureCard from '../components/FeatureCard';
import ScanCard from '../components/ScanCard';
import { recentScans, outbreakAlerts } from '../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    { title: 'Scan Crop', icon: <CameraAltIcon fontSize="large" />, path: '/scan' },
    { title: 'Scan History', icon: <HistoryIcon fontSize="large" />, path: '/history' },
    { title: 'Agricultural Advisory', icon: <AgricultureIcon fontSize="large" />, path: '/advisory' },
    { title: 'Ask an Expert', icon: <SupportAgentIcon fontSize="large" />, path: '/expert' },
  ];

  const innovations = [
    { title: 'Outbreak Alerts', icon: <NotificationsActiveIcon />, path: '/alerts', desc: 'Predicts disease before symptoms appear', highlight: true },
    { title: 'Offline Relay Sync', icon: <SyncIcon />, path: '/relay', desc: 'Works with zero signal via village phone mesh' },
    { title: 'Phone Access', icon: <PhoneInTalkIcon />, path: '/phone', desc: 'IVR, missed call & SMS — no app needed' },
    { title: 'WhatsApp Bot', icon: <WhatsAppIcon />, path: '/whatsapp', desc: 'AI diagnosis inside WhatsApp chat' },
  ];

  const highAlert = outbreakAlerts.find((a) => a.riskLevel === 'High');

  return (
    <Stack spacing={4}>
      {/* Welcome */}
      <Box>
        <Typography variant="h4">Welcome, Farmer 👋</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
          Monitor your crops and detect possible diseases or pests early.
        </Typography>
      </Box>

      {/* Predictive alert banner */}
      {highAlert ? (
        <Card
          sx={{
            bgcolor: '#FFEBEE',
            borderLeft: '6px solid',
            borderColor: 'error.main',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/alerts')}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
            <NotificationsActiveIcon color="error" sx={{ fontSize: 36 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Early Warning: {highAlert.disease} risk {highAlert.riskLevel.toLowerCase()} on {highAlert.crop}
                </Typography>
                <Chip label={`${highAlert.riskScore}% risk`} size="small" color="error" />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                AI prediction for {highAlert.window} — act before symptoms appear. Tap to see all alerts.
              </Typography>
            </Box>
            <ArrowForwardIcon color="error" />
          </CardContent>
        </Card>
      ) : null}

      {/* Primary scan card */}
      <Card sx={{ borderLeft: '6px solid', borderColor: 'primary.main' }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h5">Scan Your Crop</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 640 }}>
            Take a clear photo of your crop or upload an existing image to check for
            possible diseases and pests.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<CameraAltIcon />}
            onClick={() => navigate('/scan')}
            sx={{ mt: 3 }}
          >
            Scan Crop
          </Button>
        </CardContent>
      </Card>

      {/* Feature cards */}
      <Grid container spacing={2}>
        {features.map((f) => (
          <Grid item xs={6} md={3} key={f.title}>
            <FeatureCard icon={f.icon} title={f.title} onClick={() => navigate(f.path)} />
          </Grid>
        ))}
      </Grid>

      {/* Innovation features */}
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
          <InsightsIcon color="primary" />
          <Typography variant="h6">Smart Access & Early Warnings</Typography>
        </Stack>
        <Grid container spacing={2}>
          {innovations.map((f) => (
            <Grid item xs={12} sm={6} md={3} key={f.title}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  border: f.highlight ? '1.5px solid' : '1px solid',
                  borderColor: f.highlight ? 'error.main' : 'divider',
                }}
                onClick={() => navigate(f.path)}
              >
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        p: 1, borderRadius: 2,
                        bgcolor: f.highlight ? '#FFEBEE' : 'secondary.light',
                        color: f.highlight ? 'error.main' : 'primary.dark',
                        display: 'flex',
                      }}
                    >
                      {f.icon}
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{f.title}</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    {f.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Reach banner */}
      <Card sx={{ bgcolor: '#E8F5E9' }}>
        <CardContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <CampaignIcon color="primary" />
          <Box sx={{ flexGrow: 1, minWidth: 220 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              No smartphone? No problem.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CropGuard works via toll-free IVR, missed call, SMS and WhatsApp — share with farmers in your village.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="contained" startIcon={<PhoneInTalkIcon />} onClick={() => navigate('/phone')}>
              IVR / SMS
            </Button>
            <Button size="small" variant="outlined" color="success" startIcon={<WhatsAppIcon />} onClick={() => navigate('/whatsapp')}>
              WhatsApp
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Recent scans */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
          <Typography variant="h6">Recent Scans</Typography>
          <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate('/history')}>
            View All
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {recentScans.map((scan) => (
            <Grid item xs={12} md={6} key={scan.id}>
              <CardActionArea onClick={() => navigate('/history')} sx={{ borderRadius: 4 }}>
                <ScanCard scan={scan} />
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default Dashboard;
