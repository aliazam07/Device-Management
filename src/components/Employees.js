import React, { useMemo, useState } from 'react';
import { Box, Typography, Toolbar, TextField, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, TablePagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEmployeeModal from './AddEmployeeModal';

const initialEmployees = [
  {
    id: 1,
    employeeId: 'EMP-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'IT',
    contactNumber: '555-0101',
    jobTitle: 'SysAdmin',
    assets: [
      { name: 'Dell Latitude', sn: 'DL-12345', assignedDate: '2024-03-01' },
      { name: 'iPhone 12', sn: 'IP-77889', assignedDate: '2024-06-15' },
    ],
  },
  {
    id: 2,
    employeeId: 'EMP-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    department: 'HR',
    contactNumber: '555-0102',
    jobTitle: 'HR Manager',
    assets: [
      { name: 'MacBook Air', sn: 'MB-55667', assignedDate: '2023-11-20' },
    ],
  },
  {
    id: 3,
    employeeId: 'EMP-003',
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    department: 'Finance',
    contactNumber: '555-0103',
    jobTitle: 'Accountant',
    assets: [],
  },
];

function Employees() {
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1 }]);
  };

  const handleRequestDeleteEmployee = (id) => setConfirmDelete({ open: true, id });
  const handleConfirmDeleteClose = () => setConfirmDelete({ open: false, id: null });
  const handleDeleteEmployee = () => {
    if (confirmDelete.id != null) {
      setEmployees(employees.filter(emp => emp.id !== confirmDelete.id));
    }
    handleConfirmDeleteClose();
  };

  const handleStartEdit = (employee) => {
    setEditingEmployee(employee);
    setOpen(true);
  };

  const handleUpdateEmployee = (updated) => {
    setEmployees(prev => prev.map(emp => (emp.id === updated.id ? { ...emp, ...updated } : emp)));
    setEditingEmployee(null);
  };

  const handleViewAssets = (employee) => {
    // Placeholder: could navigate to a dedicated assets page
    console.log('Navigate to assets list for', employee);
  };

  const handleViewDetails = (employee) => {
    setDetails({ open: true, employee });
  };
  const handleCloseDetails = () => setDetails({ open: false, employee: null });

  const filteredEmployees = useMemo(() => {
    const term = searchTerm.toLowerCase();
    let list = employees.filter(employee =>
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.department.toLowerCase().includes(term)
    );
    if (departmentFilter !== 'All') {
      list = list.filter(e => e.department === departmentFilter);
    }
    list.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortBy === 'assets') {
        valA = Array.isArray(a.assets) ? a.assets.length : 0;
        valB = Array.isArray(b.assets) ? b.assets.length : 0;
      }
      if (valA == null) valA = '';
      if (valB == null) valB = '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [employees, searchTerm, departmentFilter, sortBy, sortDir]);

  const pagedEmployees = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredEmployees.slice(start, start + rowsPerPage);
  }, [filteredEmployees, page, rowsPerPage]);

  const handleChangePage = (_e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); };

  const departments = useMemo(() => ['All', ...Array.from(new Set(employees.map(e => e.department)))], [employees]);

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default', color: 'text.primary' }}>
      <Toolbar />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Employees</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mr: 2, input: { color: 'text.primary' }, label: { color: 'primary' } }}
          />
          <FormControl size="small" sx={{ minWidth: 180, mr: 2 }}>
            <InputLabel id="dept-filter-label">Department</InputLabel>
            <Select labelId="dept-filter-label" label="Department" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
              {departments.map(d => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen} sx={{ backgroundColor: 'accent.main', color: 'black' }}>
            Add Employee
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.primary', cursor: 'pointer' }} onClick={() => toggleSort('employeeId')}>Employee ID</TableCell>
              <TableCell sx={{ color: 'text.primary', cursor: 'pointer' }} onClick={() => toggleSort('name')}>Name</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Email</TableCell>
              <TableCell sx={{ color: 'text.primary', cursor: 'pointer' }} onClick={() => toggleSort('department')}>Department</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Job Title</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Contact</TableCell>
              <TableCell sx={{ color: 'text.primary', cursor: 'pointer' }} onClick={() => toggleSort('assets')}>Assigned Assets</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedEmployees.map(employee => (
              <motion.tr
                key={employee.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TableCell sx={{ color: 'text.primary' }}>{employee.employeeId}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{employee.name}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{employee.email}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{employee.department}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{employee.jobTitle || '-'}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{employee.contactNumber || '-'}</TableCell>
                <TableCell sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => handleViewAssets(employee)}>{Array.isArray(employee.assets) ? employee.assets.length : 0}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleStartEdit(employee)}><EditIcon sx={{ color: 'text.primary' }} /></IconButton>
                  <IconButton size="small" onClick={() => handleRequestDeleteEmployee(employee.id)}><DeleteIcon sx={{ color: 'text.primary' }} /></IconButton>
                  <Button size="small" onClick={() => handleViewDetails(employee)} sx={{ ml: 1 }}>View Details</Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredEmployees.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
      <Dialog open={details.open} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent dividers>
          {details.employee ? (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>{details.employee.name} ({details.employee.employeeId})</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>Assigned Assets</Typography>
              {details.employee.assets && details.employee.assets.length > 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Serial Number</TableCell>
                      <TableCell>Assigned Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details.employee.assets.map((a, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{a.name}</TableCell>
                        <TableCell>{a.sn}</TableCell>
                        <TableCell>{a.assignedDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body2">No assets assigned.</Typography>
              )}
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
      <AddEmployeeModal
        open={open}
        handleClose={() => { handleClose(); setEditingEmployee(null); }}
        handleAddEmployee={handleAddEmployee}
        editingEmployee={editingEmployee}
        handleUpdateEmployee={handleUpdateEmployee}
      />
      <Dialog open={confirmDelete.open} onClose={handleConfirmDeleteClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteClose}>Cancel</Button>
          <Button color="error" onClick={handleDeleteEmployee}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Employees;