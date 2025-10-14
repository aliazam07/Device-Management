
import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function AssignAssetModal({ open, handleClose, handleAssign, employees }) {
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const handleSubmit = () => {
    if (!selectedEmployee) {
      return;
    }
    handleAssign(selectedEmployee);
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
        <Typography variant="h6" component="h2">Assign Asset</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Employee</InputLabel>
          <Select value={selectedEmployee} label="Employee" onChange={(e) => setSelectedEmployee(e.target.value)}>
            {employees.map(employee => (
              <MenuItem key={employee.id} value={employee.name}>{employee.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ ml: 2 }}>Assign</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AssignAssetModal;
