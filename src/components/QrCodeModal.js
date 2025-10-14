
import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QRCode from 'react-qr-code';

function QrCodeModal({ open, handleClose, asset }) {

  const handlePrint = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const printWindow = window.open("", "_blank", "height=500,width=500");
    printWindow.document.write("<html><head><title>Print QR Code</title></head><body>");
    printWindow.document.write(svgData);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

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
        textAlign: 'center',
      }}>
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2">{asset?.name}</Typography>
        <Box sx={{ my: 2, p: 2, bgcolor: 'white', display: 'inline-block' }}>
          {asset && <QRCode id="QRCode" value={JSON.stringify(asset)} />}
        </Box>
        <Typography sx={{ mt: 2 }}>SN: {asset?.sn}</Typography>
        <Button onClick={handlePrint} variant="contained" sx={{ mt: 2 }}>Print QR Code</Button>
      </Box>
    </Modal>
  );
}

export default QrCodeModal;
