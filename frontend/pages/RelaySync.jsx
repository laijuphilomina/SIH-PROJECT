import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Stack, Chip, Button, Divider,
  LinearProgress, List, ListItem, ListItemIcon, ListItemText, Snackbar, Alert,
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HelpOutlineIcon from '@mui/icons-material/Help';

import { relayStatus } from '../data/mockData';

const signalChip = (signal) => ({
  Connected: { bgcolor: '#E8F5E9', color: '#2E7D32', icon: <WifiIcon sx={{ fontSize: 16 }} /> },
  'Out of range': { bgcolor: '#FFEBEE', color: '#C62828', icon: <WifiOffIcon sx={{ fontSize: 16 }} /> },
}[signal] || {});

const RelaySync = () => {
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState('');
  const { thisDevice, peers, villageGateway, syncLog, howItWorks } = relayStatus;

  const runSync = () => {
    setSyncing(true);
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setSyncing(false);
          setToast('Relay sync complete — 6 reports queued for cloud upload');
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Offline Peer-to-Peer Relay</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
          CropGuard works with <strong>no signal at all</strong> — phones in your village relay
          reports to each other until one reaches the network.
        </Typography>
      </Box>

      {/* How it works */}
      <Card sx={{ bgcolor: '#E8F5E9' }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
            <HelpOutlineIcon color="primary" />
            <Typography variant="h6">How village relay works</Typography>
          </Stack>
          <Grid container spacing={2}>
            {howItWorks.map((step, i) => (
              <Grid item xs={12} sm={6} key={step}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      minWidth: 28, height: 28, borderRadius: '50%', bgcolor: 'primary.main',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 14,
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Typography variant="body2">{step}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* This device */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PhoneAndroidIcon color="primary" />
                    <Typography variant="h6">This Device</Typography>
                  </Stack>
                  <Chip label={thisDevice.id} size="small" variant="outlined" />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="h5">{thisDevice.scansQueued}</Typography>
                    <Typography variant="caption" color="text.secondary">Scans queued</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h5">{thisDevice.casesQueued}</Typography>
                    <Typography variant="caption" color="text.secondary">Cases queued</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h5">{thisDevice.storageUsed}</Typography>
                    <Typography variant="caption" color="text.secondary">Offline storage</Typography>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={<SwapHorizIcon />}
                  onClick={runSync}
                  disabled={syncing}
                  sx={{ mt: 2.5 }}
                >
                  {syncing ? 'Relaying…' : 'Relay with Nearby Phones'}
                </Button>
                {syncing || progress > 0 ? (
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                ) : null}
              </CardContent>
            </Card>

            {/* Peers */}
            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" gutterBottom>Nearby Phones (Village Mesh)</Typography>
                <Divider sx={{ mb: 2 }} />
                <List disablePadding>
                  {peers.map((p) => (
                    <ListItem key={p.id} disableGutters sx={{ py: 1.25 }}>
                      <ListItemIcon>
                        <Chip
                          icon={signalChip(p.signal)?.icon}
                          label={p.signal}
                          size="small"
                          sx={signalChip(p.signal)}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${p.owner} · ${p.id}`}
                        secondary={p.queuedFromThem ? `Relaying ${p.queuedFromThem} reports for others` : p.lastSeen}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Gateway + log */}
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 }, textAlign: 'center' }}>
                <CloudDoneIcon sx={{ fontSize: 56, color: villageGateway.online ? 'success.main' : 'text.disabled' }} />
                <Typography variant="h6" sx={{ mt: 1 }}>Village Gateway</Typography>
                <Typography variant="body2" color="text.secondary">
                  {villageGateway.location}
                </Typography>
                <Chip
                  label={villageGateway.syncedToCloud ? `Cloud synced ${villageGateway.lastCloudSync}` : 'Awaiting signal'}
                  color={villageGateway.syncedToCloud ? 'success' : 'warning'}
                  size="small"
                  sx={{ mt: 1.5 }}
                />
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                  <Button size="small" variant="outlined" color="success" startIcon={<CloudUploadIcon />}>
                    My Phone as Gateway
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" gutterBottom>Recent Relay Activity</Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Stack spacing={1.5}>
                  {syncLog.map((log, i) => (
                    <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                      <Chip
                        size="small"
                        label={log.type === 'relay' ? 'Relay' : log.type === 'receive' ? 'Receive' : 'Cloud'}
                        sx={{ minWidth: 66, fontSize: 11, bgcolor: '#E8F5E9', color: 'primary.dark' }}
                      />
                      <Box>
                        <Typography variant="body2">{log.event}</Typography>
                        <Typography variant="caption" color="text.secondary">{log.time}</Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')}>
        <Alert severity="success" variant="filled">{toast}</Alert>
      </Snackbar>
    </Stack>
  );
};

export default RelaySync;
