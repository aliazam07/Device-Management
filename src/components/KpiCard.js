import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

function KpiCard({ title, value, icon }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderRadius: 2, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon}
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="h4">{value}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default KpiCard;
