import React, { useMemo, useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  FormControl, InputLabel, Select, MenuItem, TablePagination,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Chip, InputAdornment, useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddEmployeeModal from './AddEmployeeModal';

const initialEmployees = [
  { id: 1, employeeId: 'EMP-001', name: 'John Doe', email: 'john.doe@example.com', department: 'IT', contactNumber: '555-0101', jobTitle: 'SysAdmin', assets: [{ name: 'Dell Latitude', sn: 'DL-12345', assignedDate: '2024-03-01' }, { name: 'iPhone 12', sn: 'IP-77889', assignedDate: '2024-06-15' }] },
  { id: 2, employeeId: 'EMP-002', name: 'Jane Smith', email: 'jane.smith@example.com', department: 'HR', contactNumber: '555-0102', jobTitle: 'HR Manager', assets: [{ name: 'MacBook Air', sn: 'MB-55667', assignedDate: '2023-11-20' }] },
  { id: 3, employeeId: 'EMP-003', name: 'Peter Jones', email: 'peter.jones@example.com', department: 'Finance', contactNumber: '555-0103', jobTitle: 'Accountant', assets: [] },
];

const deptColors = {
  IT: '#818CF8', HR: '#F472B6', Finance: '#34D399', Operations: '#FBBF24', Marketing: '#60A5FA',
};

function DeptChip({ dept }) {
  const color = deptColors[dept] || '#94A3B8';
  return (
    <Chip
      label={dept}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.7rem',
        backgroundColor: `${color}20`,
        color,
        border: `1px solid ${color}40`,
      }}
    />
  );
}

function Employees() {
  const theme = useTheme();
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });
  const [details, setDetails] = useState({ open: false, employee: null });

  const handleAddEmployee = (employee) => {
    setEmployees(prev => [...prev, { ...employee, id: prev.length ? Math.max(...prev.map(e => e.id)) + 1 : 1 }]);
  };

  const handleDeleteEmployee = () => {
    if (confirmDelete.id != null) setEmployees(prev => prev.filter(e => e.id !== confirmDelete.id));
    setConfirmDelete({ open: false, id: null });
  };

  const handleUpdateEmployee = (updated) => {
    setEmployees(prev => prev.map(e => e.id === updated.id ? { ...e, ...updated } : e));
    setEditingEmployee(null);
  };

  const toggleSort = (key) => {
    if (sortBy === key) setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    else { setSortBy(key); setSortDir('asc'); }
  };

  const filteredEmployees = useMemo(() => {
    const term = searchTerm.toLowerCase();
    let list = employees.filter(e =>
      e.name.toLowerCase().includes(term) ||
      e.email.toLowerCase().includes(term) ||
      e.department.toLowerCase().includes(term)
    );
    if (departmentFilter !== 'All') list = list.filter(e => e.department === departmentFilter);
    list.sort((a, b) => {
      let vA = sortBy === 'assets' ? (a.assets?.length || 0) : (a[sortBy] || '');
      let vB = sortBy === 'assets' ? (b.assets?.length || 0) : (b[sortBy] || '');
      if (typeof vA === 'string') vA = vA.toLowerCase();
      if (typeof vB === 'string') vB = vB.toLowerCase();
      return sortDir === 'asc' ? (vA < vB ? -1 : vA > vB ? 1 : 0) : (vA > vB ? -1 : vA < vB ? 1 : 0);
    });
    return list;
  }, [employees, searchTerm, departmentFilter, sortBy, sortDir]);

  const pagedEmployees = useMemo(() => filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredEmployees, page, rowsPerPage]);
  const departments = useMemo(() => ['All', ...Array.from(new Set(employees.map(e => e.department)))], [employees]);

  const SortLabel = ({ col, label }) => (
    <Box
      component="span"
      onClick={() => toggleSort(col)}
      sx={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 0.5, userSelect: 'none',
        '&:hover': { color: theme.palette.primary.main } }}
    >
      {label}
      {sortBy === col && <span style={{ fontSize: '0.65rem' }}>{sortDir === 'asc' ? ' â†‘' : ' â†“'}</span>}
    </Box>
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, width: '100%', minWidth: 0, p: { xs: 2, sm: 2.5, md: 3 }, backgroundColor: 'background.default', minHeight: '100vh', overflowX: 'hidden' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5 }}>Employees</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Manage your team and their assigned devices</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search employees..."
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
            sx={{ width: { xs: '100%', sm: 220 } }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Department</InputLabel>
            <Select label="Department" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
              {departments.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ flexShrink: 0 }}>
          Add Employee
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><SortLabel col="employeeId" label="Employee ID" /></TableCell>
              <TableCell><SortLabel col="name" label="Name" /></TableCell>
              <TableCell>Email</TableCell>
              <TableCell><SortLabel col="department" label="Department" /></TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell><SortLabel col="assets" label="Assets" /></TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {pagedEmployees.map((emp, i) => (
                <motion.tr
                  key={emp.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
                  <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.8rem' }}>{emp.employeeId}</TableCell>
                  <TableCell sx={{ color: 'text.primary', fontWeight: 500 }}>{emp.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{emp.email}</TableCell>
                  <TableCell><DeptChip dept={emp.department} /></TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{emp.jobTitle || 'â€”'}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{emp.contactNumber || 'â€”'}</TableCell>
                  <TableCell>
                    <Chip
                      label={emp.assets?.length || 0}
                      size="small"
                      onClick={() => setDetails({ open: true, employee: emp })}
                      sx={{
                        fontWeight: 700,
                        cursor: 'pointer',
                        backgroundColor: `${theme.palette.primary.main}18`,
                        color: theme.palette.primary.main,
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                      <IconButton size="small" onClick={() => { setEditingEmployee(emp); setOpen(true); }}
                        sx={{ color: 'text.secondary', '&:hover': { color: theme.palette.primary.main } }}>
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => setConfirmDelete({ open: true, id: emp.id })}
                        sx={{ color: 'text.secondary', '&:hover': { color: theme.palette.error.main } }}>
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Button size="small" variant="outlined" onClick={() => setDetails({ open: true, employee: emp })}
                        sx={{ fontSize: '0.75rem', py: 0.4, px: 1.2, ml: 0.5 }}>
                        Details
                      </Button>
                    </Box>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredEmployees.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ borderTop: `1px solid ${theme.palette.divider}`, color: 'text.secondary' }}
        />
      </TableContainer>

      {/* Details Dialog */}
      <Dialog open={details.open} onClose={() => setDetails({ open: false, employee: null })} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Employee Details</DialogTitle>
        <DialogContent dividers>
          {details.employee && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{details.employee.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>{details.employee.employeeId} Â· {details.employee.department}</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'text.secondary', display: 'block', mb: 1 }}>
                Assigned Assets
              </Typography>
              {details.employee.assets?.length > 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Serial Number</TableCell>
                      <TableCell>Assigned Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details.employee.assets.map((a, i) => (
                      <TableRow key={i}>
                        <TableCell sx={{ color: 'text.primary' }}>{a.name}</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.8rem' }}>{a.sn}</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>{a.assignedDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>No assets assigned.</Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetails({ open: false, employee: null })}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, id: null })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteEmployee}>Delete</Button>
        </DialogActions>
      </Dialog>

      <AddEmployeeModal
        open={open}
        handleClose={() => { setOpen(false); setEditingEmployee(null); }}
        handleAddEmployee={handleAddEmployee}
        editingEmployee={editingEmployee}
        handleUpdateEmployee={handleUpdateEmployee}
      />
    </Box>
  );
}

export default Employees;

