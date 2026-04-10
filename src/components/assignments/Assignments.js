import React, { useMemo, useState } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Select, MenuItem,
  FormControl, InputLabel, Tooltip, Chip, InputAdornment, useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ReplayIcon from '@mui/icons-material/Replay';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

const statusConfig = {
  Assigned: { color: '#818CF8', bg: '#818CF820' },
  Returned: { color: '#34D399', bg: '#34D39920' },
  Revoked: { color: '#F87171', bg: '#F8717120' },
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

function Assignments({ assets = [], handleReturn, handleRevoke }) {
  const theme = useTheme();
  const [assetFilter, setAssetFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [returnDates, setReturnDates] = useState({});
  const [assignmentMeta, setAssignmentMeta] = useState({});

  const handleReturnDateChange = (id, dateStr) => {
    const newDate = dateStr || '';
    setReturnDates(prev => ({ ...prev, [id]: newDate }));
    setAssignmentMeta(prev => {
      const prevMeta = prev[id] || { status: 'Assigned' };
      const nextStatus = newDate ? 'Returned' : prevMeta.status === 'Returned' ? 'Assigned' : prevMeta.status;
      return { ...prev, [id]: { ...prevMeta, status: nextStatus, returnDate: newDate || undefined } };
    });
  };

  const onReturnClick = (id) => {
    const today = new Date().toISOString().slice(0, 10);
    const asset = assets.find(a => a.id === id);
    const employee = asset?.assignedTo || assignmentMeta[id]?.employee || '';
    setReturnDates(prev => ({ ...prev, [id]: today }));
    setAssignmentMeta(prev => ({ ...prev, [id]: { ...(prev[id] || {}), status: 'Returned', returnDate: today, employee } }));
    if (typeof handleReturn === 'function') handleReturn(id);
  };

  const rows = useMemo(() => assets
    .filter(a => !!a.assignedTo || !!assignmentMeta[a.id])
    .map(a => {
      const meta = assignmentMeta[a.id] || {};
      return {
        id: a.id,
        asset: a.name,
        serialNumber: a.sn,
        employee: meta.employee || a.assignedTo || '',
        assignmentDate: a.assignmentDate || 'N/A',
        returnDate: meta.returnDate || returnDates[a.id] || '',
        status: meta.status || (a.assignedTo ? 'Assigned' : 'Returned'),
      };
    }), [assets, returnDates, assignmentMeta]);

  const filtered = rows.filter(r =>
    r.asset.toLowerCase().includes(assetFilter.toLowerCase()) &&
    r.employee.toLowerCase().includes(employeeFilter.toLowerCase()) &&
    (statusFilter === '' || r.status === statusFilter)
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, width: '100%', minWidth: 0, p: { xs: 2, sm: 2.5, md: 3 }, backgroundColor: 'background.default', minHeight: '100vh', overflowX: 'hidden' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5 }}>Assignments</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Track device assignments, returns and revocations</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
        <TextField
          placeholder="Filter by asset..."
          size="small"
          onChange={(e) => setAssetFilter(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: 'text.secondary' }} /></InputAdornment> }}
          sx={{ width: { xs: '100%', sm: 190 } }}
        />
        <TextField
          placeholder="Filter by employee..."
          size="small"
          onChange={(e) => setEmployeeFilter(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: 'text.secondary' }} /></InputAdornment> }}
          sx={{ width: { xs: '100%', sm: 190 } }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Assigned">Assigned</MenuItem>
            <MenuItem value="Returned">Returned</MenuItem>
            <MenuItem value="Revoked">Revoked</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Serial No.</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Assigned Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
                  <TableCell sx={{ color: 'text.primary', fontWeight: 500 }}>{row.asset}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.serialNumber || 'N/A'}</TableCell>
                  <TableCell sx={{ color: 'text.primary' }}>{row.employee}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{row.assignmentDate}</TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      size="small"
                      value={row.returnDate || ''}
                      onChange={(e) => handleReturnDateChange(row.id, e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      sx={{ minWidth: 150, '& input': { fontSize: '0.85rem' } }}
                    />
                  </TableCell>
                  <TableCell><StatusChip status={row.status} /></TableCell>
                  <TableCell>
                    {row.status === 'Assigned' && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Mark as Returned">
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<ReplayIcon sx={{ fontSize: 14 }} />}
                            onClick={() => onReturnClick(row.id)}
                            sx={{ fontSize: '0.75rem', py: 0.4, px: 1.2, color: statusConfig.Returned.color, borderColor: `${statusConfig.Returned.color}60`, '&:hover': { borderColor: statusConfig.Returned.color, backgroundColor: statusConfig.Returned.bg } }}
                          >
                            Return
                          </Button>
                        </Tooltip>
                        <Tooltip title="Revoke Assignment">
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<CancelIcon sx={{ fontSize: 14 }} />}
                            onClick={() => handleRevoke && handleRevoke(row.id)}
                            sx={{ fontSize: '0.75rem', py: 0.4, px: 1.2, color: statusConfig.Revoked.color, borderColor: `${statusConfig.Revoked.color}60`, '&:hover': { borderColor: statusConfig.Revoked.color, backgroundColor: statusConfig.Revoked.bg } }}
                          >
                            Revoke
                          </Button>
                        </Tooltip>
                      </Box>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Assignments;

