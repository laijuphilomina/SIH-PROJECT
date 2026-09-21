import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Stack, ToggleButtonGroup, ToggleButton, Divider,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import ScanCard from '../components/ScanCard';
import EmptyState from '../components/EmptyState';
import { scanHistory } from '../data/mockData';

const FILTERS = ['All', 'Diseases', 'Pests', 'Healthy', 'Expert Verified'];

const matchesFilter = (scan, filter) => {
  switch (filter) {
    case 'Diseases': return scan.type === 'disease';
    case 'Pests': return scan.type === 'pest';
    case 'Healthy': return scan.type === 'healthy';
    case 'Expert Verified': return scan.status === 'Expert Verified';
    default: return true;
  }
};

const ScanHistory = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () => scanHistory.filter((s) => matchesFilter(s, filter)),
    [filter]
  );

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Scan History</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
          All your previous crop scans with AI results and expert verification status.
        </Typography>
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1.5}
      >
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, val) => val && setFilter(val)}
          size="small"
        >
          {FILTERS.map((f) => (
            <ToggleButton key={f} value={f} sx={{ px: 2, borderRadius: '10px !important' }}>
              {f}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="body2" color="text.secondary">
          {filtered.length} scan{filtered.length !== 1 ? 's' : ''}
        </Typography>
      </Stack>

      <Divider />

      {filtered.length === 0 ? (
        <EmptyState
          icon={<HistoryIcon sx={{ fontSize: 64 }} />}
          title="No scans in this category"
          description="Try a different filter or scan a new crop to build your history."
          actionLabel="Scan a Crop"
          onAction={() => navigate('/scan')}
        />
      ) : (
        <Grid container spacing={2}>
          {filtered.map((scan) => (
            <Grid item xs={12} md={6} key={scan.id}>
              <ScanCard scan={scan} onClick={() => navigate('/scan')} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <CameraAltIcon color="primary" />
          <Typography variant="body2" color="text.secondary">
            Spot something new in your field? Run a fresh scan anytime.
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ScanHistory;
