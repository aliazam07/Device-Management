// Centralized mock data used by the app. Replace with real API data later.

export const mockAssets = [
  { id: 1, name: 'Dell XPS 15', type: 'Laptop', sn: 'ABC12345', assignedTo: 'John Doe', assignmentDate: '2023-10-01' },
  { id: 2, name: 'Samsung Monitor', type: 'Monitor', sn: 'DEF67890', assignedTo: null, assignmentDate: null },
  { id: 3, name: 'Logitech MX Master 3', type: 'Mouse', sn: 'GHI11223', assignedTo: 'Jane Smith', assignmentDate: '2023-10-05' },
  { id: 4, name: 'Apple MacBook Pro 16', type: 'Laptop', sn: 'JKL44556', assignedTo: null, assignmentDate: null },
];

export const mockMaintenance = [
  { id: 1, asset: 'Dell XPS 15', type: 'Hardware Check', scheduledDate: '2023-11-01', status: 'Scheduled' },
  { id: 2, asset: 'Samsung  Monitor', type: 'Screen Calibration', scheduledDate: '2023-10-20', status: 'Completed' },
  { id: 3, asset: 'Logitech MX Master 3', type: 'Firmware Update', scheduledDate: '2023-11-10', status: 'Scheduled' },
];
