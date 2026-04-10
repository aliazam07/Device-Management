import { useState } from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Alert, InputAdornment, IconButton, Divider, useTheme } from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import AuthLayout from "./AuthLayout";

function Login() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 500));
    const result = login(email, password);
    setLoading(false);
    if (result.success) navigate("/");
    else setError(result.error);
  };

  const sx = { "& .MuiOutlinedInput-root": { borderRadius: "12px", backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)" } };

  return (
    <AuthLayout>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.02em", mb: 0.75 }}>Welcome back</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>Sign in to your AssetFlow account</Typography>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: "10px" }} onClose={() => setError("")}>{error}</Alert>}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField fullWidth label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} sx={sx}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Email sx={{ fontSize: 18, color: "text.secondary" }} /></InputAdornment> } }} />
          <TextField fullWidth label="Password" type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} sx={sx}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Lock sx={{ fontSize: 18, color: "text.secondary" }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setShowPwd(p => !p)}>{showPwd ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}</IconButton></InputAdornment> } }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, mb: 3 }}>
          <FormControlLabel control={<Checkbox size="small" checked={remember} onChange={e => setRemember(e.target.checked)} />} label={<Typography variant="caption" sx={{ color: "text.secondary" }}>Remember me</Typography>} />
          <Typography variant="caption" sx={{ color: theme.palette.primary.main, cursor: "pointer", fontWeight: 600 }}>Forgot password?</Typography>
        </Box>
        <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 1.4, fontSize: "0.95rem", fontWeight: 700, borderRadius: "12px", mb: 3 }}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        <Divider sx={{ mb: 3 }}><Typography variant="caption" sx={{ color: "text.secondary", px: 1 }}>or</Typography></Divider>
        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
          {"Don't have an account? "}
          <Box component={Link} to="/signup" sx={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: "none" }}>Create account</Box>
        </Typography>
      </Box>
    </AuthLayout>
  );
}

export default Login;
