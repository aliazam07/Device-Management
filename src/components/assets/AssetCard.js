import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, IconButton, Chip, useTheme } from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import QrCodeModal from './QrCodeModal';
import AssignAssetModal from './AssignAssetModal';
import AssetDetailsModal from './AssetDetailsModal';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

function AssetCard({ asset, handleAssign, employees }) {
  const [openQr, setOpenQr] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const theme = useTheme();
  const isAssigned = !!asset.assignedTo;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        whileHover={{ y: -4, transition: { duration: 0.15 } }}
        style={{ height: '100%', width: '100%' }}
      >
        <Card
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'box-shadow 0.2s ease',
            '&:hover': {
              boxShadow: theme.palette.mode === 'dark'
                ? `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${theme.palette.primary.main}40`
                : `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px ${theme.palette.primary.main}30`,
            },
          }}
        >
          <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  backgroundColor: `${theme.palette.primary.main}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LaptopIcon sx={{ fontSize: 22, color: theme.palette.primary.main }} />
              </Box>
              <Chip
                label={isAssigned ? 'Assigned' : 'Available'}
                size="small"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  backgroundColor: isAssigned
                    ? `${theme.palette.warning.main}20`
                    : `${theme.palette.success.main}20`,
                  color: isAssigned ? theme.palette.warning.main : theme.palette.success.main,
                  border: `1px solid ${isAssigned ? theme.palette.warning.main : theme.palette.success.main}40`,
                }}
              />
            </Box>

            {/* Info */}
            <Box sx={{ flexGrow: 1, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.25, color: 'text.primary' }}>
                {asset.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.25 }}>
                {asset.type}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                SN: {asset.sn}
              </Typography>
              {isAssigned && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                  → {asset.assignedTo}
                </Typography>
              )}
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => setOpenAssign(true)}
                sx={{ flexGrow: 1, py: 0.75, fontSize: '0.8rem' }}
              >
                Assign
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenDetails(true)}
                sx={{ flexGrow: 1, py: 0.75, fontSize: '0.8rem' }}
              >
                Details
              </Button>
              <IconButton
                size="small"
                onClick={() => setOpenQr(true)}
                sx={{
                  color: 'text.secondary',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px',
                  p: 0.75,
                  '&:hover': { color: theme.palette.primary.main, borderColor: theme.palette.primary.main },
                }}
              >
                <QrCodeIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <QrCodeModal open={openQr} handleClose={() => setOpenQr(false)} asset={asset} />
      <AssignAssetModal open={openAssign} handleClose={() => setOpenAssign(false)} handleAssign={(emp) => handleAssign(asset.id, emp)} employees={employees} />
      <AssetDetailsModal open={openDetails} handleClose={() => setOpenDetails(false)} asset={asset} />
    </>
  );
}

export default AssetCard;
