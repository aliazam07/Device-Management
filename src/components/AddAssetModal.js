
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

function AddAssetModal({ open, handleClose, handleAddAsset }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [sn, setSn] = useState('');

  const handleSubmit = () => {
    if (!name || !type || !sn) {
      return;
    }
    handleAddAsset({ name, type, sn, assignedTo: null });
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
        <Typography variant="h6" component="h2">Add New Asset</Typography>
        <TextField fullWidth label="Name" margin="normal" onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth label="Type" margin="normal" onChange={(e) => setType(e.target.value)} />
        <TextField fullWidth label="Serial Number" margin="normal" onChange={(e) => setSn(e.target.value)} />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ ml: 2 }}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddAssetModal;
