import React, { useMemo, useState } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Select, MenuItem,
  FormControl, InputLabel, Tooltip, Chip, InputAdornment, useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import ScheduleMaintenanceModal from './ScheduleMaintenanceModal';

const statusConfig = {
  Scheduled: { color: '#FBBF24', bg: '#FBBF2420' },
  Completed: { color: '#34D399', bg: '#34D39920' },
  'Under Maintenance': { color: '#60A5FA', bg: '#60A5FA20' },
};

function StatusChip({ status }) {
  const cfg = statusConfig[status] || { color: '#94A3B8', bg: '#94A3B820' };
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.7rem',
        backgroundColor: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.color}40`,
      }}
    />
  );
}

function Maintenance({ assets = [], maintenance, handleSchedule, handleComplete, handleDelete, handleReschedule }) {
  const theme = useTheme();
  const [assetFilter, setAssetFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [open, setOpen] = useState(false);

  const snByAssetName = useMemo(() => {
    const map = {};
    assets.forEach(a => { map[a.name] = a.sn; });
    return map;
  }, [assets]);

  const filtered = maintenance.filter(m =>
    m.asset.toLowerCase().includes(assetFilter.toLowerCase()) &&
    m.type.toLowerCase().includes(typeFilter.toLowerCase()) &&
    (statusFilter === '' || m.status === statusFilter)
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3.5 }, backgroundColor: 'background.default', minHeight: '100vh' }}>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5 }}>Maintenance</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Schedule and track device maintenance tasks</Typography>
      </Box>

      {/* Filters + Action Row */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 3,
      }}>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', flex: 1 }}>
          <TextField
            placeholder="Filter by asset..."
            size="small"
            onChange={(e) => setAssetFilter(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: 'text.secondary' }} /></InputAdornment> }}
            sx={{ width: { xs: '100%', sm: 180 } }}
          />
          <TextField
            placeholder="Filter by type..."
            size="small"
            onChange={(e) => setTypeFilter(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: 'text.secondary' }} /></InputAdornment> }}
            sx={{ width: { xs: '100%', sm: 180 } }}
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          Schedule Maintenance
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Serial No.</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Scheduled Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {filtered.map((m, i) => (
                <motion.tr
                  key={m.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
                  <TableCell sx={{ color: 'text.primary', fontWeight: 500 }}>{m.asset}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.8rem' }}>{snByAssetName[m.asset] || 'N/A'}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{m.type}</TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      size="small"
                      value={m.scheduledDate || ''}
                      onChange={(e) => handleReschedule && handleReschedule(m.id, e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      sx={{ minWidth: 150, '& input': { fontSize: '0.85rem' } }}
                    />
                  </TableCell>
                  <TableCell><StatusChip status={m.status} /></TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {m.status === 'Scheduled' && (
                        <Tooltip title="Mark as Completed">
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                            onClick={() => handleComplete(m.id)}
                            sx={{ fontSize: '0.75rem', py: 0.4, px: 1.2, color: statusConfig.Completed.color, borderColor: `${statusConfig.Completed.color}60`, '&:hover': { borderColor: statusConfig.Completed.color, backgroundColor: statusConfig.Completed.bg } }}
                          >
                            Complete
                          </Button>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete">
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
                          onClick={() => handleDelete(m.id)}
                          sx={{ fontSize: '0.75rem', py: 0.4, px: 1.2, color: theme.palette.error.main, borderColor: `${theme.palette.error.main}60`, '&:hover': { borderColor: theme.palette.error.main, backgroundColor: `${theme.palette.error.main}15` } }}
                        >
                          Delete
                        </Button>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      <ScheduleMaintenanceModal open={open} handleClose={() => setOpen(false)} handleSchedule={handleSchedule} assets={assets} />
    </Box>
  );
}

export default Maintenance;
