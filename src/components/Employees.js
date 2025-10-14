import React, { useState } from 'react';
import { Box, Typography, Toolbar, TextField, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEmployeeModal from './AddEmployeeModal';

const initialEmployees = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', department: 'IT', assets: 5 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', department: 'HR', assets: 2 },
  { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', department: 'Finance', assets: 3 },
];

function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default', color: 'text.primary' }}>
      <Toolbar />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Employees</Typography>
        <Box>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mr: 2, input: { color: 'text.primary' }, label: { color: 'primary' } }}
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen} sx={{ backgroundColor: 'accent.main', color: 'black' }}>
            Add Employee
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.primary' }}>Name</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Email</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Department</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Assigned Assets</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map(employee => (
              <motion.tr
                key={employee.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TableCell sx={{ color: 'text.primary' }}>{employee.name}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{employee.email}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{employee.department}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{employee.assets}</TableCell>
                <TableCell>
                  <IconButton size="small"><EditIcon sx={{ color: 'text.primary' }} /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteEmployee(employee.id)}><DeleteIcon sx={{ color: 'text.primary' }} /></IconButton>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddEmployeeModal open={open} handleClose={handleClose} handleAddEmployee={handleAddEmployee} />
    </Box>
  );
}

export default Employees;