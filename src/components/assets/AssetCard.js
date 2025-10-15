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
          borderRadius: 3,
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          minWidth: 0,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: `0 6px 20px accent.glow`,
            borderColor: 'accent.main',
            transform: 'translateY(-3px)',
          },
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: { xs: 2, md: 3 },
            minWidth: 0,
          }}
        >
          {/* Top section: Asset Name, Type, SN, and Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 2, minWidth: 0 }}>
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
            <LaptopIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>

          {/* Status Indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 3 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: asset.assignedTo ? 'warning.main' : 'success.main',
                mr: 1.5,
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
              {asset.assignedTo ? `Assigned To: ${asset.assignedTo}` : 'Available'}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ mt: 'auto', display: 'flex', gap: 1.5 }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: 'accent.main',
                color: 'text.primary',
                flexGrow: 1,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'accent.main',
                  opacity: 0.9,
                }
              }}
              onClick={() => setOpenAssign(true)}
            >
              Assign
            </Button>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                color: 'text.primary',
                borderColor: 'text.secondary',
                flexGrow: 1,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }
              }}
              onClick={() => setOpenDetails(true)}
            >
              View Details
            </Button>
            <IconButton
              size="medium"
              onClick={() => setOpenQr(true)}
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              <QrCodeIcon sx={{ fontSize: 28 }} />
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
