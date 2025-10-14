
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

function ScheduleMaintenanceModal({ open, handleClose, handleSchedule }) {
  const [asset, setAsset] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (!asset || !type || !date) {
      return;
    }
    handleSchedule({ asset, type, scheduledDate: date, status: 'Scheduled' });
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
        <TextField fullWidth label="Asset" margin="normal" onChange={(e) => setAsset(e.target.value)} />
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
