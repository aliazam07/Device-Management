import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Snackbar, Alert } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './ThemeContext';
import Sidebar from './components/shared/Sidebar';
import Dashboard from './components/Dashboard';
import AssetManagement from './components/assets/AssetManagement';
import Employees from './components/Employees';
import Assignments from './components/assignments/Assignments';
import Maintenance from './components/maintenance/Maintenance';
import { getAssets, getMaintenance } from './services/api';

function App() {
  const [assets, setAssets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [assignSnackOpen, setAssignSnackOpen] = useState(false);
  const [assignSnackMsg, setAssignSnackMsg] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [a, m] = await Promise.all([getAssets(), getMaintenance()]);
      if (mounted) {
        setAssets(a);
        setMaintenance(m);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleAssign = (assetId, employeeName) => {
    const today = new Date().toISOString().slice(0, 10);
    setAssets(assets.map(asset => asset.id === assetId ? { ...asset, assignedTo: employeeName, assignmentDate: today } : asset));
    setAssignSnackMsg(`Assigned to ${employeeName} successfully`);
    setAssignSnackOpen(true);
  };

  const handleReturnAssignment = (assetId) => {
    // Unassign asset when returned
    setAssets(assets.map(asset => asset.id === assetId ? { ...asset, assignedTo: null } : asset));
  };

  const handleRevokeAssignment = (assetId) => {
    // Unassign asset when revoked (same underlying change for now)
    setAssets(assets.map(asset => asset.id === assetId ? { ...asset, assignedTo: null } : asset));
  };

  const handleAddAsset = (newAsset) => {
    setAssets([...assets, { ...newAsset, id: assets.length + 1 }]);
  };

  const handleSchedule = (newMaintenance) => {
    setMaintenance([...maintenance, { ...newMaintenance, id: maintenance.length + 1 }]);
  };

  const handleComplete = (id) => {
    setMaintenance(maintenance.map(m => m.id === id ? { ...m, status: 'Completed' } : m));
  };

  const handleDelete = (id) => {
    setMaintenance(maintenance.filter(m => m.id !== id));
  };

  const handleReschedule = (id, newDate) => {
    setMaintenance(maintenance.map(m => m.id === id ? { ...m, scheduledDate: newDate } : m));
  };

  return (
    <ThemeContextProvider>
      {(theme) => (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Box sx={{ display: 'flex' }}>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Dashboard assets={assets} maintenance={maintenance} />} />
                <Route path="/assets" element={<AssetManagement assets={assets} handleAddAsset={handleAddAsset} handleAssign={handleAssign} />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/assignments" element={<Assignments assets={assets} handleReturn={handleReturnAssignment} handleRevoke={handleRevokeAssignment} />} />
                <Route path="/maintenance" element={<Maintenance assets={assets} maintenance={maintenance} handleSchedule={handleSchedule} handleComplete={handleComplete} handleDelete={handleDelete} handleReschedule={handleReschedule} />} />
              </Routes>
              <Snackbar open={assignSnackOpen} autoHideDuration={3000} onClose={() => setAssignSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => setAssignSnackOpen(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                  {assignSnackMsg}
                </Alert>
              </Snackbar>
            </Box>
          </Router>
        </ThemeProvider>
      )}
    </ThemeContextProvider>
  );
}

export default App;
