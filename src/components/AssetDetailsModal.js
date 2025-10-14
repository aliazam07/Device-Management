
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

function AssetDetailsModal({ open, handleClose, asset }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography variant="h6" component="h2">Asset Details</Typography>
        {asset && (
          <>
            <Typography sx={{ mt: 2 }}>Name: {asset.name}</Typography>
            <Typography>Type: {asset.type}</Typography>
            <Typography>Serial Number: {asset.sn}</Typography>
            <Typography>Assigned To: {asset.assignedTo || 'N/A'}</Typography>
            {/* Add more details as needed */}
          </>
        )}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AssetDetailsModal;
