import { Card, CardActionArea, Stack, Box, Typography, Chip } from '@mui/material';
import SeverityChip from './SeverityChip';
import StatusChip from './StatusChip';

const ScanCard = ({ scan, onClick }) => (
  <Card>
    <CardActionArea onClick={onClick}>
      <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: 'center' }}>
        <Box
          component="img"
          src={scan.image}
          alt={scan.crop}
          sx={{ width: 64, height: 64, borderRadius: 2, objectFit: 'cover', bgcolor: 'secondary.light' }}
        />
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {scan.crop}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {scan.disease} · {scan.confidence}% confidence
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', rowGap: 0.5 }}>
            <SeverityChip severity={scan.severity} size="small" />
            <StatusChip status={scan.status} size="small" />
          </Stack>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
          {scan.time}
        </Typography>
      </Stack>
    </CardActionArea>
  </Card>
);

export default ScanCard;
