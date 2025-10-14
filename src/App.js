
import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './ThemeContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AssetManagement from './components/AssetManagement';
import Employees from './components/Employees';
import Assignments from './components/Assignments';
import Maintenance from './components/Maintenance';

const initialAssets = [
  { id: 1, name: 'Dell XPS 15', type: 'Laptop', sn: 'ABC12345', assignedTo: 'John Doe' },
  { id: 2, name: 'Samsung Odyssey Monitor', type: 'Monitor', sn: 'DEF67890', assignedTo: null },
  { id: 3, name: 'Logitech MX Master 3', type: 'Mouse', sn: 'GHI11223', assignedTo: 'Jane Smith' },
  { id: 4, name: 'Apple MacBook Pro 16', type: 'Laptop', sn: 'JKL44556', assignedTo: null },
];

const initialMaintenance = [
  { id: 1, asset: 'Dell XPS 15', type: 'Hardware Check', scheduledDate: '2023-11-01', status: 'Scheduled' },
  { id: 2, asset: 'Samsung Odyssey Monitor', type: 'Screen Calibration', scheduledDate: '2023-10-20', status: 'Completed' },
  { id: 3, asset: 'Logitech MX Master 3', type: 'Firmware Update', scheduledDate: '2023-11-10', status: 'Scheduled' },
];

function App() {
  const [assets, setAssets] = useState(initialAssets);
  const [maintenance, setMaintenance] = useState(initialMaintenance);

  const handleAssign = (assetId, employeeName) => {
    setAssets(assets.map(asset => asset.id === assetId ? { ...asset, assignedTo: employeeName } : asset));
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
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/maintenance" element={<Maintenance maintenance={maintenance} handleSchedule={handleSchedule} handleComplete={handleComplete} handleDelete={handleDelete} />} />
              </Routes>
            </Box>
          </Router>
        </ThemeProvider>
      )}
    </ThemeContextProvider>
  );
}

export default App;
