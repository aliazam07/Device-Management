import React, { useMemo, useState } from 'react';
import { Box, Typography, Toolbar, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, Tooltip, ButtonGroup } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleMaintenanceModal from './ScheduleMaintenanceModal';

function Maintenance({ assets = [], maintenance, handleSchedule, handleComplete, handleDelete, handleReschedule }) {
  const [assetFilter, setAssetFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredMaintenance = maintenance.filter(m =>
    m.asset.toLowerCase().includes(assetFilter.toLowerCase()) &&
    m.type.toLowerCase().includes(typeFilter.toLowerCase()) &&
    (statusFilter === '' || m.status === statusFilter)
  );

  const snByAssetName = useMemo(() => {
    const map = {};
    assets.forEach(a => { map[a.name] = a.sn; });
    return map;
  }, [assets]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default', color: 'text.primary' }}>
      <Toolbar />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Maintenance</Typography>
        <Box>
          <TextField label="Filter by Asset" size="small" onChange={(e) => setAssetFilter(e.target.value)} sx={{ mr: 2, input: { color: 'text.primary' }, label: { color: 'text.primary' } }} />
          <TextField label="Filter by Type" size="small" onChange={(e) => setTypeFilter(e.target.value)} sx={{ mr: 2, input: { color: 'text.primary' }, label: { color: 'text.primary' } }} />
          <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel sx={{ color: 'text.primary' }}>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)} sx={{ color: 'text.primary', '& .MuiSvgIcon-root': { color: 'text.primary' } }}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen} sx={{ backgroundColor: 'accent.main', color: 'black' }}>
            Schedule Maintenance
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.primary' }}>Asset</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Asset SN</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Type</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Scheduled Date</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Status</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMaintenance.map(m => (
              <motion.tr key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TableCell sx={{ color: 'text.primary' }}>{m.asset}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{snByAssetName[m.asset] || 'N/A'}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{m.type}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>
                  <TextField
                    type="date"
                    size="small"
                    value={m.scheduledDate || ''}
                    onChange={(e) => handleReschedule && handleReschedule(m.id, e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& input': { color: 'text.primary' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                      minWidth: 160,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{m.status}</TableCell>
                <TableCell>
                  <ButtonGroup variant="text" size="small">
                    {m.status === 'Scheduled' && (
                      <Tooltip title="Mark as Completed">
                        <Button aria-label="Complete" onClick={() => handleComplete(m.id)} startIcon={<CheckCircleIcon sx={{ color: 'text.primary' }} />} sx={{ color: 'text.primary' }}>
                          Complete
                        </Button>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete Maintenance">
                      <Button aria-label="Delete" onClick={() => handleDelete(m.id)} startIcon={<DeleteIcon sx={{ color: 'text.primary' }} />} sx={{ color: 'text.primary' }}>
                        Delete
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ScheduleMaintenanceModal open={open} handleClose={handleClose} handleSchedule={handleSchedule} assets={assets} />
    </Box>
  );
}

export default Maintenance;
