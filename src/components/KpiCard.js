import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const start = prev.current;
    const end = Number(target) || 0;
    prev.current = end;
    if (start === end) return;

    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return count;
}

function KpiCard({ title, value, icon, color }) {
  const theme = useTheme();
  const animatedValue = useCountUp(value);

  const accentColor = color || theme.palette.primary.main;
  const bgColor = `${accentColor}18`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      style={{ height: '100%', width: '100%' }}
    >
      <Card sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  display: 'block',
                  mb: 0.75,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: '2rem',
                  letterSpacing: '-0.03em',
                  color: 'text.primary',
                  lineHeight: 1,
                }}
              >
                {animatedValue}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                backgroundColor: bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {React.cloneElement(icon, { sx: { fontSize: 22, color: accentColor } })}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default KpiCard;
