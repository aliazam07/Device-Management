import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

function KpiCard({ title, value, icon }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} style={{ height: '100%', width: '100%', minWidth: 0 }}>
      <Card sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderRadius: 2, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)', height: '100%', width: '100%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ height: '100%', minWidth: 0, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
            {icon}
            <Box sx={{ ml: 2, minWidth: 0 }}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="h4" sx={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{value}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default KpiCard;
