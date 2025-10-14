import React, { useState } from 'react';
import { Box, Typography, Toolbar, TextField, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';
import ReplayIcon from '@mui/icons-material/Replay';
import CancelIcon from '@mui/icons-material/Cancel';

const initialAssignments = [
  { id: 1, asset: 'Dell XPS 15', employee: 'John Doe', assignmentDate: '2023-10-01', returnDate: null, status: 'Assigned' },
  { id: 2, asset: 'Samsung Odyssey Monitor', employee: 'Jane Smith', assignmentDate: '2023-09-15', returnDate: '2023-10-10', status: 'Returned' },
  { id: 3, asset: 'Logitech MX Master 3', employee: 'Peter Jones', assignmentDate: '2023-10-05', returnDate: null, status: 'Assigned' },
];

function Assignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [assetFilter, setAssetFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleReturn = (id) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: 'Returned', returnDate: new Date().toISOString().slice(0, 10) } : a));
  };

  const handleRevoke = (id) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: 'Revoked' } : a));
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.asset.toLowerCase().includes(assetFilter.toLowerCase()) &&
    assignment.employee.toLowerCase().includes(employeeFilter.toLowerCase()) &&
    (statusFilter === '' || assignment.status === statusFilter)
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default', color: 'text.primary' }}>
      <Toolbar />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Assignments</Typography>
        <Box>
          <TextField label="Filter by Asset" size="small" onChange={(e) => setAssetFilter(e.target.value)} sx={{ mr: 2, input: { color: 'white' }, label: { color: 'text.primary' } }} />
          <TextField label="Filter by Employee" size="small" onChange={(e) => setEmployeeFilter(e.target.value)} sx={{ mr: 2, input: { color: 'white' }, label: { color: 'text.primary' } }} />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: 'text.primary' }}>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)} sx={{ color: 'text.primary', '& .MuiSvgIcon-root': { color: 'text.primary' } }}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="Returned">Returned</MenuItem>
              <MenuItem value="Revoked">Revoked</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.primary' }}>Asset</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Employee</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Assignment Date</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Return Date</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Status</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssignments.map(assignment => (
              <motion.tr key={assignment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TableCell sx={{ color: 'text.primary' }}>{assignment.asset}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{assignment.employee}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{assignment.assignmentDate}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{assignment.returnDate || 'N/A'}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{assignment.status}</TableCell>
                <TableCell>
                  {assignment.status === 'Assigned' && (
                    <>
                      <IconButton size="small" onClick={() => handleReturn(assignment.id)}><ReplayIcon sx={{ color: 'text.primary' }} /></IconButton>
                      <IconButton size="small" onClick={() => handleRevoke(assignment.id)}><CancelIcon sx={{ color: 'text.primary' }} /></IconButton>
                    </>
                  )}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Assignments;