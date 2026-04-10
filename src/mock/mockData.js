// Centralized mock data used by the app. Replace with real API data later.

export const mockAssets = [
  { id: 1,  name: "Dell XPS 15",           type: "Laptop",    sn: "ABC12345",  assignedTo: "John Doe",      assignmentDate: "2024-01-10" },
  { id: 2,  name: "Samsung 27in Monitor",  type: "Monitor",   sn: "DEF67890",  assignedTo: null,            assignmentDate: null },
  { id: 3,  name: "Logitech MX Master 3",  type: "Mouse",     sn: "GHI11223",  assignedTo: "Jane Smith",    assignmentDate: "2024-02-05" },
  { id: 4,  name: "Apple MacBook Pro 16",  type: "Laptop",    sn: "JKL44556",  assignedTo: "Peter Jones",   assignmentDate: "2024-01-20" },
  { id: 5,  name: "HP LaserJet Pro",       type: "Printer",   sn: "MNO77889",  assignedTo: null,            assignmentDate: null },
  { id: 6,  name: "Lenovo ThinkPad X1",    type: "Laptop",    sn: "PQR22334",  assignedTo: "Sarah Connor",  assignmentDate: "2024-03-01" },
  { id: 7,  name: "Apple iPad Pro 12.9",   type: "Tablet",    sn: "STU55667",  assignedTo: "Mike Johnson",  assignmentDate: "2024-02-18" },
  { id: 8,  name: "Sony WH-1000XM5",       type: "Headset",   sn: "VWX88990",  assignedTo: "Jane Smith",    assignmentDate: "2024-03-10" },
  { id: 9,  name: "LG UltraWide 34in",     type: "Monitor",   sn: "YZA11234",  assignedTo: null,            assignmentDate: null },
  { id: 10, name: "Cisco IP Phone 8845",   type: "Phone",     sn: "BCD55678",  assignedTo: "John Doe",      assignmentDate: "2024-01-15" },
  { id: 11, name: "Microsoft Surface Pro", type: "Tablet",    sn: "EFG99012",  assignedTo: null,            assignmentDate: null },
  { id: 12, name: "Razer BlackWidow V3",   type: "Keyboard",  sn: "HIJ33456",  assignedTo: "Peter Jones",   assignmentDate: "2024-02-28" },
  { id: 13, name: "Dell PowerEdge R740",   type: "Server",    sn: "KLM77890",  assignedTo: null,            assignmentDate: null },
  { id: 14, name: "Apple iPhone 15 Pro",   type: "Phone",     sn: "NOP11234",  assignedTo: "Sarah Connor",  assignmentDate: "2024-03-05" },
  { id: 15, name: "Asus ProArt PA279CV",   type: "Monitor",   sn: "QRS55678",  assignedTo: "Mike Johnson",  assignmentDate: "2024-01-25" },
  { id: 16, name: "Logitech C920 Webcam",  type: "Webcam",    sn: "TUV99012",  assignedTo: null,            assignmentDate: null },
  { id: 17, name: "HP EliteBook 840 G9",   type: "Laptop",    sn: "WXY33456",  assignedTo: "Emily Davis",   assignmentDate: "2024-02-10" },
  { id: 18, name: "Samsung Galaxy Tab S9", type: "Tablet",    sn: "ZAB77890",  assignedTo: null,            assignmentDate: null },
  { id: 19, name: "Jabra Evolve2 85",      type: "Headset",   sn: "CDE11234",  assignedTo: "Emily Davis",   assignmentDate: "2024-03-15" },
  { id: 20, name: "Synology NAS DS923+",   type: "Server",    sn: "FGH55678",  assignedTo: null,            assignmentDate: null },
];

export const mockMaintenance = [
  { id: 1,  asset: "Dell XPS 15",           type: "Hardware Check",      scheduledDate: "2024-04-01", status: "Scheduled" },
  { id: 2,  asset: "Samsung 27in Monitor",  type: "Screen Calibration",  scheduledDate: "2024-03-20", status: "Completed" },
  { id: 3,  asset: "Logitech MX Master 3",  type: "Firmware Update",     scheduledDate: "2024-04-10", status: "Scheduled" },
  { id: 4,  asset: "Apple MacBook Pro 16",  type: "Battery Replacement", scheduledDate: "2024-04-05", status: "Under Maintenance" },
  { id: 5,  asset: "HP LaserJet Pro",       type: "Toner Replacement",   scheduledDate: "2024-03-28", status: "Completed" },
  { id: 6,  asset: "Lenovo ThinkPad X1",    type: "OS Update",           scheduledDate: "2024-04-15", status: "Scheduled" },
  { id: 7,  asset: "Dell PowerEdge R740",   type: "RAID Check",          scheduledDate: "2024-03-25", status: "Completed" },
  { id: 8,  asset: "Cisco IP Phone 8845",   type: "Firmware Update",     scheduledDate: "2024-04-20", status: "Scheduled" },
  { id: 9,  asset: "LG UltraWide 34in",     type: "Dead Pixel Check",    scheduledDate: "2024-04-08", status: "Under Maintenance" },
  { id: 10, asset: "HP EliteBook 840 G9",   type: "Thermal Cleaning",    scheduledDate: "2024-03-30", status: "Completed" },
  { id: 11, asset: "Synology NAS DS923+",   type: "Disk Health Check",   scheduledDate: "2024-04-25", status: "Scheduled" },
  { id: 12, asset: "Apple iPhone 15 Pro",   type: "Screen Protector",    scheduledDate: "2024-04-12", status: "Scheduled" },
];
