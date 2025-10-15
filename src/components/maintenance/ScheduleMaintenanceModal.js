import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function ScheduleMaintenanceModal({ open, handleClose, handleSchedule, assets = [] }) {
  const [assetId, setAssetId] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (!assetId || !type || !date) {
      return;
    }
    const selected = assets.find(a => String(a.id) === String(assetId));
    const assetName = selected ? selected.name : '';
    handleSchedule({ asset: assetName, type, scheduledDate: date, status: 'Scheduled' });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography variant="h6" component="h2">Schedule New Maintenance</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Asset</InputLabel>
          <Select value={assetId} label="Asset" onChange={(e) => setAssetId(e.target.value)}>
            {assets.map(asset => (
              <MenuItem key={asset.id} value={asset.id}>{asset.name} ({asset.sn})</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField fullWidth label="Maintenance Type" margin="normal" onChange={(e) => setType(e.target.value)} />
        <TextField fullWidth label="Scheduled Date" type="date" InputLabelProps={{ shrink: true }} margin="normal" onChange={(e) => setDate(e.target.value)} />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ ml: 2 }}>Schedule</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ScheduleMaintenanceModal;
