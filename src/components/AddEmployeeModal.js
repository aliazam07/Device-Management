
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

function AddEmployeeModal({ open, handleClose, handleAddEmployee, editingEmployee, handleUpdateEmployee }) {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    if (editingEmployee) {
      setEmployeeId(editingEmployee.employeeId || '');
      setName(editingEmployee.name || '');
      setEmail(editingEmployee.email || '');
      setDepartment(editingEmployee.department || '');
      setContactNumber(editingEmployee.contactNumber || '');
      setJobTitle(editingEmployee.jobTitle || '');
    } else {
      setEmployeeId('');
      setName('');
      setEmail('');
      setDepartment('');
      setContactNumber('');
      setJobTitle('');
    }
  }, [editingEmployee, open]);

  const handleSubmit = () => {
    if (!employeeId || !name || !email || !department) {
      return;
    }
    const payload = {
      employeeId,
      name,
      email,
      department,
      contactNumber,
      jobTitle,
    };
    if (editingEmployee && handleUpdateEmployee) {
      handleUpdateEmployee({ ...editingEmployee, ...payload });
    } else if (handleAddEmployee) {
      handleAddEmployee({ ...payload, assets: [] });
    }
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
        <Typography variant="h6" component="h2">{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</Typography>
        <TextField fullWidth label="Employee ID" margin="normal" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
        <TextField fullWidth label="Name" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Department" margin="normal" value={department} onChange={(e) => setDepartment(e.target.value)} />
        <TextField fullWidth label="Contact Number" margin="normal" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        <TextField fullWidth label="Job Title" margin="normal" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ ml: 2 }}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddEmployeeModal;
