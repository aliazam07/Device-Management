import React, { useMemo, useState } from 'react';
import { Box, Typography, Toolbar, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, Tooltip, ButtonGroup } from '@mui/material';
import { motion } from 'framer-motion';
import ReplayIcon from '@mui/icons-material/Replay';
import CancelIcon from '@mui/icons-material/Cancel';
 
function Assignments({ assets = [], handleReturn, handleRevoke }) {
  const [assetFilter, setAssetFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [returnDates, setReturnDates] = useState({}); // { [assetId]: 'YYYY-MM-DD' }
  const [assignmentMeta, setAssignmentMeta] = useState({}); // { [assetId]: { status: 'Assigned'|'Returned'|'Revoked', returnDate?: 'YYYY-MM-DD' } }

  const handleReturnDateChange = (id, dateStr) => {
    const newReturnDate = dateStr && dateStr.length ? dateStr : '';
    setReturnDates(prev => ({ ...prev, [id]: newReturnDate }));
    setAssignmentMeta(prev => {
      const prevMeta = prev[id] || { status: 'Assigned' };
      const nextStatus = newReturnDate ? 'Returned' : prevMeta.status === 'Returned' ? 'Assigned' : prevMeta.status;
      return { ...prev, [id]: { ...prevMeta, status: nextStatus, returnDate: newReturnDate || undefined } };
    });
  };

  const onReturnClick = (id) => {
    const today = new Date().toISOString().slice(0, 10);
    const asset = assets.find(a => a.id === id);
    const employee = asset?.assignedTo || (assignmentMeta[id]?.employee ?? '');
    setReturnDates(prev => ({ ...prev, [id]: today }));
    setAssignmentMeta(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), status: 'Returned', returnDate: today, employee }
    }));
    if (typeof handleReturn === 'function') {
      handleReturn(id);
    }
  };
 
  const rows = useMemo(() => {
    // Include assets that are currently assigned OR have assignment meta (e.g., Returned)
    return assets
      .filter(a => !!a.assignedTo || !!assignmentMeta[a.id])
      .map(a => {
        const meta = assignmentMeta[a.id] || {};
        return {
          id: a.id,
          asset: a.name,
          serialNumber: a.sn,
          employee: meta.employee || a.assignedTo || '',
          assignmentDate: a.assignmentDate || 'N/A',
          returnDate: meta.returnDate || returnDates[a.id] || '',
          status: meta.status || (a.assignedTo ? 'Assigned' : 'Returned'),
        };
      });
  }, [assets, returnDates, assignmentMeta]);

  const filteredAssignments = rows.filter(assignment =>
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
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.primary' }}>Asset</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>Asset SN</TableCell>
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
                <TableCell sx={{ color: 'text.primary' }}>{assignment.serialNumber || 'N/A'}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{assignment.employee}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{assignment.assignmentDate}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>
                  <TextField
                    type="date"
                    size="small"
                    value={assignment.returnDate || ''}
                    onChange={(e) => handleReturnDateChange(assignment.id, e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& input': { color: 'text.primary' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                      minWidth: 160,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{assignment.status}</TableCell>
                <TableCell>
                  {assignment.status === 'Assigned' && (
                    <ButtonGroup variant="text" size="small">
                      <Tooltip title="Mark as Returned">
                        <Button aria-label="Return" onClick={() => onReturnClick(assignment.id)} startIcon={<ReplayIcon sx={{ color: 'text.primary' }} />} sx={{ color: 'text.primary' }}>
                          Return
                        </Button>
                      </Tooltip>
                      <Tooltip title="Revoke Assignment">
                        <Button aria-label="Revoke" onClick={() => handleRevoke && handleRevoke(assignment.id)} startIcon={<CancelIcon sx={{ color: 'text.primary' }} />} sx={{ color: 'text.primary' }}>
                          Revoke
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
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
