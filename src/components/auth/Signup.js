import { useState } from "react";
import { Box, Typography, TextField, Button, Alert, InputAdornment, IconButton, LinearProgress, useTheme } from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Person } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import AuthLayout from "./AuthLayout";

function getStrength(pwd) {
  if (!pwd) return { score: 0, label: "", color: "transparent" };
  let s = 0;
  if (pwd.length >= 8) s++;
  if (pwd.length >= 12) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  if (s <= 1) return { score: 20, label: "Weak", color: "#F87171" };
  if (s <= 3) return { score: 60, label: "Medium", color: "#FBBF24" };
  return { score: 100, label: "Strong", color: "#34D399" };
}

function Signup() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));
  const strength = getStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const result = signup(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) navigate("/");
    else setError(result.error);
  };

  const sx = { "& .MuiOutlinedInput-root": { borderRadius: "12px", backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)" } };

  return (
    <AuthLayout>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.02em", mb: 0.75 }}>Create account</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>Get started with AssetFlow today</Typography>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: "10px" }} onClose={() => setError("")}>{error}</Alert>}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField fullWidth label="Full Name" value={form.name} onChange={set("name")} sx={sx}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Person sx={{ fontSize: 18, color: "text.secondary" }} /></InputAdornment> } }} />
          <TextField fullWidth label="Email Address" type="email" value={form.email} onChange={set("email")} sx={sx}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Email sx={{ fontSize: 18, color: "text.secondary" }} /></InputAdornment> } }} />
          <Box>
            <TextField fullWidth label="Password" type={showPwd ? "text" : "password"} value={form.password} onChange={set("password")} sx={sx}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><Lock sx={{ fontSize: 18, color: "text.secondary" }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setShowPwd(p => !p)}>{showPwd ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}</IconButton></InputAdornment> } }} />
            {form.password && (
              <Box sx={{ mt: 1 }}>
                <LinearProgress variant="determinate" value={strength.score} sx={{ height: 4, borderRadius: 2, backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", "& .MuiLinearProgress-bar": { backgroundColor: strength.color, borderRadius: 2 } }} />
                <Typography variant="caption" sx={{ color: strength.color, fontWeight: 600, mt: 0.5, display: "block" }}>{strength.label}</Typography>
              </Box>
            )}
          </Box>
          <TextField fullWidth label="Confirm Password" type={showCfm ? "text" : "password"} value={form.confirm} onChange={set("confirm")}
            error={!!form.confirm && form.password !== form.confirm}
            helperText={form.confirm && form.password !== form.confirm ? "Passwords do not match" : ""} sx={sx}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Lock sx={{ fontSize: 18, color: "text.secondary" }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setShowCfm(p => !p)}>{showCfm ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}</IconButton></InputAdornment> } }} />
        </Box>
        <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 1.4, fontSize: "0.95rem", fontWeight: 700, borderRadius: "12px", mt: 3, mb: 3 }}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
          {"Already have an account? "}
          <Box component={Link} to="/login" sx={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: "none" }}>Sign in</Box>
        </Typography>
      </Box>
    </AuthLayout>
  );
}

export default Signup;
