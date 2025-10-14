import React from 'react';
import { Box, Typography, Toolbar, Grid } from '@mui/material';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import KpiCard from './KpiCard';
import { Devices, Assignment, Build, CheckCircle } from '@mui/icons-material';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard({ assets = [], maintenance = [] }) {
  const totalAssets = assets.length;
  const assignedAssets = assets.filter(asset => asset.assignedTo).length;
  const scheduledMaintenance = maintenance.filter(m => m.status === 'Scheduled').length;
  const completedMaintenance = maintenance.filter(m => m.status === 'Completed').length;

  const assetStatusData = {
    labels: ['Assigned', 'Unassigned'],
    datasets: [
      {
        data: [assignedAssets, totalAssets - assignedAssets],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#ef5350'],
      },
    ],
  };

  const maintenanceStatusData = {
    labels: ['Scheduled', 'Completed'],
    datasets: [
      {
        label: 'Maintenance Tasks',
        data: [scheduledMaintenance, completedMaintenance],
        backgroundColor: ['#ff9800', '#2196f3'],
      },
    ],
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default', color: 'text.primary' }}>
      <Toolbar />
      <Typography variant="h4" sx={{ mb: 4 }}>Dashboard</Typography>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Total Assets" value={totalAssets} icon={<Devices sx={{ fontSize: 40, color: 'accent.main' }} />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Assigned Assets" value={assignedAssets} icon={<Assignment sx={{ fontSize: 40, color: 'accent.main' }} />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Maintenance Scheduled" value={scheduledMaintenance} icon={<Build sx={{ fontSize: 40, color: 'accent.main' }} />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Maintenance Completed" value={completedMaintenance} icon={<CheckCircle sx={{ fontSize: 40, color: 'accent.main' }} />} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Asset Status</Typography>
            <Doughnut data={assetStatusData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Maintenance Status</Typography>
            <Bar data={maintenanceStatusData} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
