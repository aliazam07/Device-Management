
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

function AddEmployeeModal({ open, handleClose, handleAddEmployee }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = () => {
    // Basic validation
    if (!name || !email || !department) {
      return;
    }
    handleAddEmployee({ name, email, department, assets: 0 });
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
        <Typography variant="h6" component="h2">Add New Employee</Typography>
        <TextField fullWidth label="Name" margin="normal" onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Department" margin="normal" onChange={(e) => setDepartment(e.target.value)} />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ ml: 2 }}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddEmployeeModal;
