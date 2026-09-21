import { useState } from 'react';
import {
  Box, Typography, Stack, Chip, Switch, FormControlLabel, Tooltip, Divider,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { heatmapExplanation } from '../data/mockData';

// Simulated Grad-CAM style hotspot regions (percent-based so they work on any image)
const REGIONS = [
  { id: 'r1', top: 58, left: 18, size: 34, weight: 0.82 },
  { id: 'r2', top: 30, left: 52, size: 26, weight: 0.64 },
  { id: 'r3', top: 12, left: 22, size: 18, weight: 0.41 },
];

const regionColor = (w) =>
  w > 0.7 ? 'rgba(198,40,40,0.45)' : w > 0.5 ? 'rgba(239,108,0,0.42)' : 'rgba(249,168,37,0.4)';

const HeatmapOverlay = ({ imageUri }) => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const { model, about, trustNote } = heatmapExplanation;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <VisibilityIcon color="primary" />
          <Typography variant="h6">Why the AI decided this (Explainable AI)</Typography>
        </Stack>
        <FormControlLabel
          control={<Switch checked={showHeatmap} onChange={(e) => setShowHeatmap(e.target.checked)} color="primary" />}
          label="Show heatmap"
        />
      </Stack>

      <Box
        sx={{
          position: 'relative',
          maxHeight: 340,
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: '#F4FAF4',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {imageUri ? (
          <Box
            component="img"
            src={imageUri}
            alt="Explanation view"
            sx={{ width: '100%', objectFit: 'contain', maxHeight: 340 }}
          />
        ) : (
          <Box sx={{ width: '100%', height: 260, bgcolor: 'secondary.light' }} />
        )}

        {showHeatmap &&
          REGIONS.map((r) => (
            <Tooltip
              key={r.id}
              title={`Evidence strength: ${(r.weight * 100).toFixed(0)}%`}
              arrow
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: `${r.top}%`,
                  left: `${r.left}%`,
                  width: `${r.size}%`,
                  aspectRatio: '1',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${regionColor(r.weight)} 0%, rgba(255,255,255,0) 70%)`,
                  border: `2px solid ${regionColor(r.weight).replace('0.45', '0.8').replace('0.42', '0.8').replace('0.4', '0.8')}`,
                  animation: 'cgPulse 2.2s ease-in-out infinite',
                  '@keyframes cgPulse': {
                    '0%, 100%': { transform: 'scale(1)', opacity: 0.85 },
                    '50%': { transform: 'scale(1.06)', opacity: 1 },
                  },
                }}
              />
            </Tooltip>
          ))}
      </Box>

      <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap', rowGap: 1 }} alignItems="center">
        <Chip label={`Model: ${model}`} size="small" variant="outlined" />
        <Stack direction="row" spacing={1} alignItems="center">
          {[
            { c: 'rgba(198,40,40,0.6)', l: 'Strong' },
            { c: 'rgba(239,108,0,0.6)', l: 'Moderate' },
            { c: 'rgba(249,168,37,0.6)', l: 'Weak' },
          ].map((x) => (
            <Stack key={x.l} direction="row" spacing={0.5} alignItems="center">
              <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: x.c }} />
              <Typography variant="caption" color="text.secondary">{x.l} evidence</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
        <InfoOutlinedIcon sx={{ fontSize: 15, verticalAlign: 'text-bottom', mr: 0.5 }} />
        {about}
      </Typography>
      <Divider sx={{ my: 1.5 }} />
      <Typography variant="body2" color="text.secondary">
        {trustNote}
      </Typography>
    </Box>
  );
};

export default HeatmapOverlay;
