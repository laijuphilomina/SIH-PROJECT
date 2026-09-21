import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Checkbox, FormControlLabel, Divider, Alert,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VerifiedIcon from '@mui/icons-material/Verified';

import { insuranceReportTemplate, profileData } from '../data/mockData';

const InsuranceReportDialog = ({ open, onClose, result }) => {
  const [consent, setConsent] = useState(false);
  const [generated, setGenerated] = useState(false);
  const template = insuranceReportTemplate;

  const reportData = {
    'Farmer Name': profileData.name,
    'Farmer ID': profileData.farmerId,
    'Crop & Variety': result?.crop || '—',
    'Field Location': `${profileData.village}, ${profileData.district}`,
    'Detected Issue': result ? `${result.disease} (${result.confidence}% confidence)` : '—',
    'Severity Assessment': result?.severity ? `${result.severity} severity` : '—',
    'Expert Verification': 'Pending / Verified by KVK expert',
    'Date of Detection': result?.analyzedAt
      ? new Date(result.analyzedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      : new Date().toLocaleDateString('en-IN'),
    'Photo Evidence': 'Geo-tagged scan image(s) attached',
  };

  const handleGenerate = () => {
    const report = {
      documentType: 'Crop Damage Assessment Report',
      scheme: template.scheme,
      generatedAt: new Date().toISOString(),
      ...reportData,
      declaration: 'This report is generated from AI scan data and KVK verification records of CropGuard AI and is intended to support crop insurance claim documentation.',
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cropguard-pmfby-report-${(result?.crop || 'crop').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setGenerated(true);
  };

  const handleClose = () => {
    setGenerated(false);
    setConsent(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PictureAsPdfIcon color="primary" />
        Insurance-Ready Crop Report
      </DialogTitle>
      <DialogContent dividers>
        <Alert severity="info" sx={{ mb: 2 }}>
          {template.issuerNote}
        </Alert>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <VerifiedIcon color="success" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{template.scheme}</Typography>
        </Stack>

        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F1F8E9' }}>
                <TableCell sx={{ fontWeight: 700 }}>Field</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Value</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Data Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {template.reportFields.map((f) => (
                <TableRow key={f.field}>
                  <TableCell sx={{ fontWeight: 600 }}>{f.field}</TableCell>
                  <TableCell>{reportData[f.field] || f.sample}</TableCell>
                  <TableCell>
                    <Chip label={f.source} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 2 }} />

        <FormControlLabel
          control={<Checkbox checked={consent} onChange={(e) => setConsent(e.target.checked)} />}
          label="I declare the information above is accurate to the best of my knowledge and consent to sharing it with my insurance provider / agriculture department."
        />

        {generated ? (
          <Alert severity="success" sx={{ mt: 2 }}>
            Report generated and downloaded. Share it with your bank, CSC, or insurance
            agent along with your policy number to file a claim under PMFBY.
          </Alert>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          variant="contained"
          startIcon={<PictureAsPdfIcon />}
          disabled={!consent}
          onClick={handleGenerate}
        >
          {generated ? 'Download Again' : 'Generate Report'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InsuranceReportDialog;
