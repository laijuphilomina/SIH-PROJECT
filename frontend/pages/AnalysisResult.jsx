import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Button, Stack, Divider, Alert, AlertTitle,
  Chip, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { heatmapExplanation } from '../data/mockData';

import ConfidenceBar from '../components/ConfidenceBar';
import SeverityChip from '../components/SeverityChip';
import HeatmapOverlay from '../components/HeatmapOverlay';
import InsuranceReportDialog from '../components/InsuranceReportDialog';
import { resultDetails } from '../data/mockData';

const AnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [heatmapOpen, setHeatmapOpen] = useState(false);

  // Direct URL visit without analysis data — send back to scanner
  if (!result) {
    return (
      <Stack spacing={3} sx={{ alignItems: 'center', py: 8 }}>
        <Typography variant="h5">No analysis result found</Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Start a new scan to get an AI analysis of your crop.
        </Typography>
        <Button variant="contained" size="large" startIcon={<CameraAltIcon />} onClick={() => navigate('/scan')}>
          Scan a Crop
        </Button>
      </Stack>
    );
  }

  const isLowConfidence = result.confidence < 60;
  const isHealthy = result.type === 'healthy';
  const details = result.details || resultDetails[result.disease] || resultDetails.default;

  const handleSaveReport = () => {
    try {
      const report = {
        crop: result.crop,
        disease: result.disease,
        confidence: result.confidence,
        severity: result.severity,
        analyzedAt: result.analyzedAt,
      };
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cropguard-report-${result.crop.toLowerCase()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // non-blocking; demo action
    }
  };

  // ---------- LOW CONFIDENCE STATE ----------
  if (isLowConfidence) {
    return (
      <Stack spacing={3}>
        <Typography variant="h4">Crop Analysis Result</Typography>

        <Card>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            {result.imageUri ? (
              <Box
                component="img"
                src={result.imageUri}
                alt="Analyzed crop"
                sx={{ width: '100%', maxHeight: 320, objectFit: 'contain', borderRadius: 3, bgcolor: '#F4FAF4' }}
              />
            ) : null}
            <Box sx={{ mt: 3 }}>
              <ConfidenceBar value={result.confidence} />
            </Box>
          </CardContent>
        </Card>

        <Alert severity="warning" icon={<WarningAmberIcon fontSize="inherit" />}>
          <AlertTitle sx={{ fontWeight: 700 }}>Low Confidence</AlertTitle>
          Please capture another clear image or request expert verification.
        </Alert>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => navigate('/scan')}
          >
            Retake Image
          </Button>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="success"
            startIcon={<SupportAgentIcon />}
            onClick={() => navigate('/expert')}
          >
            Ask Expert
          </Button>
        </Stack>
      </Stack>
    );
  }

  // ---------- NORMAL RESULT STATE ----------
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Crop Analysis Result</Typography>

      {/* Image + prediction summary */}
      <Card>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              {result.imageUri ? (
                <Box
                  component="img"
                  src={result.imageUri}
                  alt="Analyzed crop"
                  sx={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 3, bgcolor: '#F4FAF4' }}
                />
              ) : (
                <Box sx={{ height: 200, borderRadius: 3, bgcolor: 'secondary.light' }} />
              )}
            </Grid>
            <Grid item xs={12} md={7}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Crop</Typography>
                  <Typography variant="h5">{result.crop}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Detected Issue</Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                    <Typography variant="h5" sx={{ color: isHealthy ? 'success.main' : 'error.main' }}>
                      {result.disease}
                    </Typography>
                    <Chip
                      size="small"
                      label={result.type === 'pest' ? 'Pest' : isHealthy ? 'Healthy' : 'Disease'}
                      color={isHealthy ? 'success' : result.type === 'pest' ? 'secondary' : 'error'}
                      variant="outlined"
                    />
                  </Stack>
                </Box>
                <ConfidenceBar value={result.confidence} />
                <Box>
                  <SeverityChip severity={result.severity} />
                </Box>
                {isHealthy ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CheckCircleIcon color="success" />
                    <Typography variant="body2" color="text.secondary">
                      No disease or pest detected. Keep monitoring your crop regularly.
                    </Typography>
                  </Stack>
                ) : null}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Detail sections */}
      {!isHealthy ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Detected Symptoms</Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Stack component="ul" spacing={1} sx={{ m: 0, pl: 3 }}>
                  {details.symptoms.map((s) => (
                    <Typography key={s} component="li" variant="body2">{s}</Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Recommended Crop Management</Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Stack component="ul" spacing={1} sx={{ m: 0, pl: 3 }}>
                  {details.management.map((m) => (
                    <Typography key={m} component="li" variant="body2">{m}</Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}

      {/* Explainable AI heatmap */}
      <Card>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <HeatmapOverlay imageUri={result.imageUri} />
          <Button fullWidth variant="outlined" color="success" sx={{ mt: 2 }} onClick={() => setHeatmapOpen(true)}>
            View Region Details
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: '#E8F5E9' }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
            When to Contact an Expert
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Follow locally approved agricultural guidance and consult an agricultural expert
            when necessary. Do not apply any pesticide or treatment without confirmed expert advice.
          </Typography>
        </CardContent>
      </Card>

      {/* Actions */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<AgricultureIcon />}
          onClick={() => navigate('/advisory')}
        >
          View Advisory
        </Button>
        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="success"
          startIcon={<SupportAgentIcon />}
          onClick={() => navigate('/expert')}
        >
          Ask KVK Expert
        </Button>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="inherit"
          startIcon={<SaveAltIcon />}
          onClick={handleSaveReport}
        >
          Save Report
        </Button>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="secondary"
          startIcon={<AssignmentIcon />}
          onClick={() => setInsuranceOpen(true)}
        >
          Insurance Report (PMFBY)
        </Button>
        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="inherit"
          startIcon={<RefreshIcon />}
          onClick={() => navigate('/scan')}
        >
          Scan Another Crop
        </Button>
      </Stack>

      {/* Heatmap region details dialog */}
      <Dialog open={heatmapOpen} onClose={() => setHeatmapOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>AI Evidence Regions</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            {heatmapExplanation.regions.map((r) => (
              <Box key={r.id}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{r.label}</Typography>
                  <Chip size="small" label={`${(r.weight * 100).toFixed(0)}% evidence`} />
                </Stack>
                <Typography variant="body2" color="text.secondary">{r.evidence}</Typography>
                <Divider sx={{ mt: 1 }} />
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setHeatmapOpen(false)}>Done</Button>
        </DialogActions>
      </Dialog>

      {/* Insurance report dialog */}
      <InsuranceReportDialog
        open={insuranceOpen}
        onClose={() => setInsuranceOpen(false)}
        result={result}
      />
    </Stack>
  );
};

export default AnalysisResult;
