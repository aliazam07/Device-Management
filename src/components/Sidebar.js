import React, { useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Switch, Box, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Dashboard, Devices, People, Assignment, Build } from '@mui/icons-material';
import { ThemeContext } from '../ThemeContext';

const drawerWidth = 240;

const navLinks = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Asset Management', icon: <Devices />, path: '/assets' },
  { text: 'Employees', icon: <People />, path: '/employees' },
  { text: 'Assignments', icon: <Assignment />, path: '/assignments' },
  { text: 'Maintenance', icon: <Build />, path: '/maintenance' },
];

function Sidebar() {
  const { toggleColorMode } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: 'background.paper', color: 'text.primary' },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          Device
        </Typography>
      </Box>
      <List>
        {navLinks.map((item, index) => (
          <ListItem
            button
            key={item.text}
            component={NavLink}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => (isActive ? 'active' : '')}
            sx={{
              color: theme.palette.text.primary,
              textDecoration: 'none',
              '&.active': {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.action.selected,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                '& .MuiListItemText-primary': {
                  color: theme.palette.primary.main,
                },
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.text.primary,
                },
                '& .MuiListItemText-primary': {
                  color: theme.palette.text.primary,
                },
              },
              '& .MuiListItemIcon-root': {
                color: theme.palette.text.primary,
              },
              '& .MuiListItemText-primary': {
                color: theme.palette.text.primary,
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Dark</Typography>
        <Switch onChange={toggleColorMode} />
        <Typography>Light</Typography>
      </Box>
    </Drawer>
  );
}

export default Sidebar;