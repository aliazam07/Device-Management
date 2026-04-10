import React, { useContext, useState } from 'react';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Box, Typography, useTheme, Switch, IconButton, useMediaQuery, Tooltip,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Dashboard, Devices, People, Assignment, Build, LightMode, DarkMode, Menu, Close, Logout } from '@mui/icons-material';
import { ThemeContext } from '../../ThemeContext';
import { useAuth } from '../../AuthContext';

const DRAWER_WIDTH = 240;

const navLinks = [
  { text: 'Dashboard', icon: <Dashboard fontSize="small" />, path: '/' },
  { text: 'Asset Management', icon: <Devices fontSize="small" />, path: '/assets' },
  { text: 'Employees', icon: <People fontSize="small" />, path: '/employees' },
  { text: 'Assignments', icon: <Assignment fontSize="small" />, path: '/assignments' },
  { text: 'Maintenance', icon: <Build fontSize="small" />, path: '/maintenance' },
];

function SidebarContent({ onClose }) {
  const { toggleColorMode, mode } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isDark = mode === 'dark';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', py: 1 }}>
      {/* Company Logo */}
      <Box sx={{ px: 2, pt: 2.5, pb: 1.5 }}>
        <Box sx={{
          position: 'relative',
          borderRadius: '14px',
          overflow: 'hidden',
          backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
          border: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1.5,
          py: 1.25,
        }}>
          <Box
            component="img"
            src="/company-logo.avif"
            alt="Company Logo"
            sx={{
              height: 36,
              maxWidth: 160,
              objectFit: 'contain',
              objectPosition: 'left center',
              filter: isDark ? 'brightness(1) invert(0)' : 'brightness(0.15)',
              transition: 'filter 0.3s ease',
            }}
          />
          {onClose && (
            <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary', ml: 1 }}>
              <Close fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Nav label */}
      <Typography variant="caption" sx={{ px: 2.5, pt: 1.5, pb: 0.5, color: 'text.secondary', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.09em' }}>
        Navigation
      </Typography>

      {/* Nav Links */}
      <List sx={{ px: 1.5, flex: 1 }}>
        {navLinks.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            end={item.path === '/'}
            onClick={onClose}
            sx={{
              borderRadius: '10px',
              mb: 0.5,
              px: 1.5,
              py: 0.9,
              color: 'text.secondary',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
              '&.active': {
                color: theme.palette.primary.main,
                backgroundColor: isDark ? 'rgba(129,140,248,0.12)' : 'rgba(99,102,241,0.08)',
                '& .MuiListItemIcon-root': { color: theme.palette.primary.main },
                '& .MuiListItemText-primary': { color: theme.palette.primary.main, fontWeight: 600 },
              },
              '&:hover:not(.active)': {
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                color: 'text.primary',
                '& .MuiListItemIcon-root': { color: 'text.primary' },
              },
              '& .MuiListItemIcon-root': { color: 'text.secondary', minWidth: 34 },
              '& .MuiListItemText-primary': { fontSize: '0.875rem', fontWeight: 500 },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      {/* User + Logout */}
      {user && (
        <Box sx={{
          mx: 1.5, mb: 1.5, p: 1.5, borderRadius: '12px',
          backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
          border: `1px solid ${theme.palette.divider}`,
          display: 'flex', alignItems: 'center', gap: 1,
        }}>
          <Box sx={{
            width: 30, height: 30, borderRadius: '8px', flexShrink: 0,
            backgroundColor: `${theme.palette.primary.main}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: theme.palette.primary.main, fontSize: '0.75rem' }}>
              {user.name?.charAt(0).toUpperCase()}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', display: 'block', fontSize: '0.76rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.67rem' }}>
              {user.role}
            </Typography>
          </Box>
          <Tooltip title="Sign out">
            <IconButton size="small" onClick={logout} sx={{ color: 'text.secondary', flexShrink: 0, '&:hover': { color: theme.palette.error.main } }}>
              <Logout sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Theme Toggle */}
      <Box sx={{
        mx: 1.5, mb: 2, p: 1.5, borderRadius: '12px',
        backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${theme.palette.divider}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isDark
            ? <DarkMode sx={{ fontSize: 15, color: theme.palette.primary.main }} />
            : <LightMode sx={{ fontSize: 15, color: '#F59E0B' }} />
          }
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.76rem' }}>
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </Typography>
        </Box>
        <Switch size="small" checked={!isDark} onChange={toggleColorMode} />
      </Box>
    </Box>
  );
}

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        {/* Mobile hamburger â€” fixed top-left */}
        <Box sx={{
          position: 'fixed', top: 12, left: 12, zIndex: 1300,
          backgroundColor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <IconButton size="small" onClick={() => setMobileOpen(true)} sx={{ p: 1, color: 'text.primary' }}>
            <Menu fontSize="small" />
          </IconButton>
        </Box>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              border: 'none',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <SidebarContent onClose={() => setMobileOpen(false)} />
        </Drawer>
      </>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          border: 'none',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <SidebarContent />
    </Drawer>
  );
}

export default Sidebar;

