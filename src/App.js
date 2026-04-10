import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Snackbar, Alert } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { ThemeContextProvider } from './ThemeContext';
import { AuthProvider, useAuth } from './AuthContext';
import Sidebar from './components/shared/Sidebar';
import Dashboard from './components/Dashboard';
import AssetManagement from './components/assets/AssetManagement';
import Employees from './components/Employees';
import Assignments from './components/assignments/Assignments';
import Maintenance from './components/maintenance/Maintenance';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { getAssets, getMaintenance } from './services/api';

function ProtectedApp() {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    (async () => {
      const [a, m] = await Promise.all([getAssets(), getMaintenance()]);
      if (mounted) { setAssets(a); setMaintenance(m); }
    })();
    return () => { mounted = false; };
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;

  const handleAssign = (assetId, name) => {
    const today = new Date().toISOString().slice(0, 10);
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, assignedTo: name, assignmentDate: today } : a));
    setSnackMsg(`Assigned to ${name} successfully`);
    setSnackOpen(true);
  };
  const handleReturn = id => setAssets(prev => prev.map(a => a.id === id ? { ...a, assignedTo: null } : a));
  const handleRevoke = id => setAssets(prev => prev.map(a => a.id === id ? { ...a, assignedTo: null } : a));
  const handleAddAsset = asset => setAssets(prev => [...prev, { ...asset, id: prev.length + 1 }]);
  const handleSchedule = m => setMaintenance(prev => [...prev, { ...m, id: prev.length + 1 }]);
  const handleComplete = id => setMaintenance(prev => prev.map(m => m.id === id ? { ...m, status: 'Completed' } : m));
  const handleDelete = id => setMaintenance(prev => prev.filter(m => m.id !== id));
  const handleReschedule = (id, date) => setMaintenance(prev => prev.map(m => m.id === id ? { ...m, scheduledDate: date } : m));

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, minWidth: 0, width: 0, overflowY: 'auto', pt: { xs: '56px', md: 0 } }}>
        <Routes>
          <Route path="/" element={<Dashboard assets={assets} maintenance={maintenance} />} />
          <Route path="/assets" element={<AssetManagement assets={assets} handleAddAsset={handleAddAsset} handleAssign={handleAssign} />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/assignments" element={<Assignments assets={assets} handleReturn={handleReturn} handleRevoke={handleRevoke} />} />
          <Route path="/maintenance" element={<Maintenance assets={assets} maintenance={maintenance} handleSchedule={handleSchedule} handleComplete={handleComplete} handleDelete={handleDelete} handleReschedule={handleReschedule} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSnackOpen(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
}

function App() {
  return (
    <ThemeContextProvider>
      {(theme) => (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path="/*" element={<ProtectedApp />} />
              </Routes>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      )}
    </ThemeContextProvider>
  );
}

export default App;
