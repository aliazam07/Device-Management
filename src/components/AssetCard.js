import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, IconButton } from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QrCodeModal from './QrCodeModal';
import AssignAssetModal from './AssignAssetModal';
import AssetDetailsModal from './AssetDetailsModal';

function AssetCard({ asset, handleAssign, employees }) {
  const [openQr, setOpenQr] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <Card
        sx={{
          backgroundColor: 'background.paper',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 3, // Slightly increased border-radius for a softer look
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)', // More pronounced but softer shadow
          display: 'flex', // Use flexbox for consistent height
          flexDirection: 'column', // Stack content vertically
          height: '100%', // Ensure all cards in a grid have the same height
          transition: 'all 0.3s ease-in-out', // Smooth hover effect
          '&:hover': {
            boxShadow: `0 6px 20px accent.glow`, // Enhanced glow on hover
            borderColor: 'accent.main',
            transform: 'translateY(-3px)', // Slight lift effect on hover
          },
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1, // Allows content to fill available space, pushing footer down
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // Distribute space between main content and actions
            padding: 3, // Increased padding for more breathing room inside the card
          }}
        >
          {/* Top section: Asset Name, Type, SN, and Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h6" component="div" sx={{ mb: 0.5 }}>
                {asset.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
                Type: {asset.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                SN: {asset.sn}
              </Typography>
            </Box>
            <LaptopIcon sx={{ fontSize: 40, color: 'primary.main' }} /> {/* Larger icon, using primary color */}
          </Box>

          {/* Status Indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 3 }}> {/* Increased vertical margin */}
            <Box
              sx={{
                width: 12, // Slightly larger status dot
                height: 12,
                borderRadius: '50%',
                backgroundColor: asset.assignedTo ? 'warning.main' : 'success.main', // Using theme colors for better consistency
                mr: 1.5, // Increased margin to the right of the dot
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
              {asset.assignedTo ? `Assigned To: ${asset.assignedTo}` : 'Available'}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ mt: 'auto', display: 'flex', gap: 1.5 }}> {/* 'auto' margin pushes to bottom, added gap */}
            <Button
              variant="contained"
              size="medium" // Slightly larger buttons
              sx={{
                backgroundColor: 'accent.main',
                color: 'text.primary', // Ensure text color contrasts well in both themes
                flexGrow: 1, // Allow buttons to grow and fill space
                py: 1, // Vertical padding for button
                borderRadius: 2, // Consistent border radius
                '&:hover': {
                  backgroundColor: 'accent.main', // Keep background consistent on hover if desired
                  opacity: 0.9,
                }
              }}
              onClick={() => setOpenAssign(true)}
            >
              Assign
            </Button>
            <Button
              variant="outlined"
              size="medium" // Slightly larger buttons
              sx={{
                color: 'text.primary', // Ensure text color contrasts well
                borderColor: 'text.secondary', // Use a theme color for the border
                flexGrow: 1, // Allow buttons to grow and fill space
                py: 1, // Vertical padding for button
                borderRadius: 2, // Consistent border radius
                '&:hover': {
                  borderColor: 'primary.main', // Highlight border on hover
                  color: 'primary.main',
                }
              }}
              onClick={() => setOpenDetails(true)}
            >
              View Details
            </Button>
            <IconButton
              size="medium" // Consistent size with buttons
              onClick={() => setOpenQr(true)}
              sx={{
                color: 'primary.main', // Use theme color for icon button
                '&:hover': {
                  backgroundColor: 'action.hover', // Theme hover effect
                }
              }}
            >
              <QrCodeIcon sx={{ fontSize: 28 }} /> {/* Larger QR icon */}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <QrCodeModal open={openQr} handleClose={() => setOpenQr(false)} asset={asset} />
      <AssignAssetModal open={openAssign} handleClose={() => setOpenAssign(false)} handleAssign={(employee) => handleAssign(asset.id, employee)} employees={employees} />
      <AssetDetailsModal open={openDetails} handleClose={() => setOpenDetails(false)} asset={asset} />
    </>
  );
}

export default AssetCard;