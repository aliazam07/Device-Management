import { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AssetCard from './AssetCard';
import AddAssetModal from './AddAssetModal';

const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Peter Jones' },
  { id: 4, name: 'Sarah Connor' },
  { id: 5, name: 'Mike Johnson' },
  { id: 6, name: 'Emily Davis' },
];

function AssetManagement({ assets = [], handleAddAsset, handleAssign }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.sn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: '100%',
        minWidth: 0,
        p: { xs: 2, sm: 2.5, md: 3 },
        backgroundColor: 'background.default',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.25 }}>Asset Management</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Manage and track all your company devices</Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 3,
      }}>
        <TextField
          placeholder="Search by name, type or serial..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: { xs: '100%', sm: 300 } }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsModalOpen(true)} sx={{ flexShrink: 0 }}>
          Add New Asset
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          },
          gap: 2,
          width: '100%',
        }}
      >
        {filteredAssets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} handleAssign={handleAssign} employees={employees} />
        ))}
      </Box>

      <AddAssetModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} handleAddAsset={handleAddAsset} />
    </Box>
  );
}

export default AssetManagement;
