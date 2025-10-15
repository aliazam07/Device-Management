import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Toolbar, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssetCard from './AssetCard';
import AddAssetModal from './AddAssetModal';

const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Peter Jones' },
];

function AssetManagement({ assets, handleAddAsset, handleAssign }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.sn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, backgroundColor: 'background.default', color: 'text.primary' }}>
      <Toolbar />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: { xs: 2, md: 3 } }}>
        <Typography variant="h4">
          Asset Management
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search Assets..."
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              mr: 0,
              width: { xs: '100%', sm: 260 },
              input: { color: 'text.primary' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'text.primary',
                },
                '&:hover fieldset': {
                  borderColor: 'accent.main',
                },
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsModalOpen(true)}
            sx={{
              backgroundColor: 'accent.main',
              color: 'black',
              boxShadow: `0 0 15px accent.glow`,
              '&:hover': {
                backgroundColor: 'accent.main',
                boxShadow: `0 0 25px accent.glow`,
              },
            }}
          >
            Add New Asset
          </Button>
        </Box>
      </Box>
      <Grid container alignItems="stretch" rowSpacing={3} columnSpacing={{ xs: 2, md: 3 }}>
        {filteredAssets.map((asset) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={asset.id} sx={{ display: 'flex', minWidth: 0 }}>
            <AssetCard asset={asset} handleAssign={handleAssign} employees={employees} />
          </Grid>
        ))}
      </Grid>
      <AddAssetModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} handleAddAsset={handleAddAsset} />
    </Box>
  );
}

export default AssetManagement;
