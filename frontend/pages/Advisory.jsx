import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Grid, Stack, Divider, Button,
} from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ShieldIcon from '@mui/icons-material/Shield';

import { advisoryData } from '../data/mockData';

const Advisory = () => {
  const navigate = useNavigate();
  const data = advisoryData;

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Crop Advisory</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
          Simple guidance to protect your {data.crop.toLowerCase()} crop from {data.disease}.
        </Typography>
      </Box>

      {/* Disease information */}
      <Card>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
            <MenuBookIcon color="primary" />
            <Typography variant="h6">Disease Information</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', rowGap: 1 }}>
            <Button size="small" variant="outlined" color="success" onClick={() => navigate('/history')}>
              {data.crop}
            </Button>
            <Button size="small" variant="outlined" color="error" onClick={() => navigate('/history')}>
              {data.disease}
            </Button>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <WarningAmberIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Symptoms to watch for</Typography>
              </Stack>
              <Stack component="ul" spacing={1} sx={{ m: 0, pl: 3 }}>
                {data.about.symptoms.map((s) => (
                  <Typography key={s} component="li" variant="body2" color="text.secondary">{s}</Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <WaterDropIcon sx={{ color: 'info.main', fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Possible causes</Typography>
              </Stack>
              <Stack component="ul" spacing={1} sx={{ m: 0, pl: 3 }}>
                {data.about.causes.map((c) => (
                  <Typography key={c} component="li" variant="body2" color="text.secondary">{c}</Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Prevention */}
      <Card>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
            <ShieldIcon sx={{ color: 'success.main' }} />
            <Typography variant="h6">Prevention</Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {data.prevention.map((p, i) => (
              <Grid item xs={12} sm={6} key={p}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      minWidth: 28, height: 28, borderRadius: '50%',
                      bgcolor: 'primary.light', color: 'primary.dark',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 14,
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Typography variant="body2">{p}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Crop management */}
      <Card>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
            <AgricultureIcon color="primary" />
            <Typography variant="h6">Crop Management</Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack component="ul" spacing={1} sx={{ m: 0, pl: 3 }}>
            {data.management.map((m) => (
              <Typography key={m} component="li" variant="body2">{m}</Typography>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Expert support */}
      <Card sx={{ bgcolor: '#E8F5E9' }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
            <VaccinesIcon sx={{ color: 'primary.dark' }} />
            <Typography variant="h6">Expert Recommendation</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {data.expertNote}
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<SupportAgentIcon />}
            onClick={() => navigate('/expert')}
          >
            Contact KVK Expert
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Advisory;
