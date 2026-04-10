import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, Typography,
} from "@mui/material";

function AddEmployeeModal({ open, handleClose, handleAddEmployee, editingEmployee, handleUpdateEmployee }) {
  const [form, setForm] = useState({
    employeeId: "", name: "", email: "", department: "",
    contactNumber: "", jobTitle: "", assetCount: 0,
  });

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        employeeId: editingEmployee.employeeId || "",
        name: editingEmployee.name || "",
        email: editingEmployee.email || "",
        department: editingEmployee.department || "",
        contactNumber: editingEmployee.contactNumber || "",
        jobTitle: editingEmployee.jobTitle || "",
        assetCount: editingEmployee.assets?.length || 0,
      });
    } else {
      setForm({ employeeId: "", name: "", email: "", department: "", contactNumber: "", jobTitle: "", assetCount: 0 });
    }
  }, [editingEmployee, open]);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.employeeId || !form.name || !form.email || !form.department) return;
    const count = parseInt(form.assetCount, 10) || 0;
    const assets = editingEmployee?.assets?.length
      ? editingEmployee.assets
      : Array.from({ length: count }, (_, i) => ({
          name: `Asset ${i + 1}`,
          sn: `SN-${form.employeeId}-${i + 1}`,
          assignedDate: new Date().toISOString().slice(0, 10),
        }));
    const payload = { employeeId: form.employeeId, name: form.name, email: form.email, department: form.department, contactNumber: form.contactNumber, jobTitle: form.jobTitle, assets };
    if (editingEmployee && handleUpdateEmployee) {
      handleUpdateEmployee({ ...editingEmployee, ...payload });
    } else if (handleAddEmployee) {
      handleAddEmployee(payload);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {editingEmployee ? "Edit Employee" : "Add New Employee"}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {editingEmployee ? "Update employee information" : "Fill in the details to add a new team member"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

          {/* Row 1: Full Name - full width */}
          <TextField
            fullWidth
            label="Full Name"
            required
            size="small"
            value={form.name}
            onChange={set("name")}
          />

          {/* Row 2: Employee ID + Email */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField fullWidth label="Employee ID" required size="small" value={form.employeeId} onChange={set("employeeId")} />
            <TextField fullWidth label="Email Address" required size="small" type="email" value={form.email} onChange={set("email")} />
          </Box>

          {/* Row 3: Department + Job Title */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField fullWidth label="Department" required size="small" value={form.department} onChange={set("department")} />
            <TextField fullWidth label="Job Title" size="small" value={form.jobTitle} onChange={set("jobTitle")} />
          </Box>

          {/* Row 4: Contact Number + No. of Assets */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField fullWidth label="Contact Number" size="small" value={form.contactNumber} onChange={set("contactNumber")} />
            <TextField
              fullWidth
              label="No. of Assets"
              size="small"
              type="number"
              value={form.assetCount}
              onChange={set("assetCount")}
              disabled={!!editingEmployee}
              slotProps={{ htmlInput: { min: 0, max: 100 } }}
              helperText={editingEmployee ? "Manage from Assignments" : ""}
            />
          </Box>

        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ minWidth: 90 }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ minWidth: 90 }}>
          {editingEmployee ? "Update" : "Add Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEmployeeModal;
