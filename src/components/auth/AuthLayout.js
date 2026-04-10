import { Box, Typography, useTheme } from "@mui/material";

function AuthLayout({ children }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", backgroundColor: isDark ? "#0A0F1E" : "#F1F5F9" }}>
      <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", justifyContent: "space-between", width: "42%", flexShrink: 0, p: 5, background: "linear-gradient(145deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%)", position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, position: "relative", zIndex: 1 }}>
          <Box component="img" src="/company-logo.avif" alt="Logo" sx={{ height: 38, objectFit: "contain", filter: "brightness(10)" }} />
        </Box>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1.15, mb: 2 }}>
            Manage your assets smarter
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 340 }}>
            Track devices, assign to employees, schedule maintenance — all in one professional dashboard.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 4 }}>
            {["📦  Real-time asset tracking", "👥  Employee assignment management", "🔧  Maintenance scheduling"].map(f => (
              <Box key={f} sx={{ display: "inline-flex", px: 2, py: 1, borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.12)", width: "fit-content" }}>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.85rem", fontWeight: 500 }}>{f}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", position: "relative", zIndex: 1 }}>
          © 2026 AssetFlow · Device Management Platform
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 3, sm: 5 } }}>
        <Box sx={{ width: "100%", maxWidth: 420 }}>{children}</Box>
      </Box>
    </Box>
  );
}

export default AuthLayout;
