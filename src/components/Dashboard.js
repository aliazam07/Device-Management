import React from "react";
import { Box, Typography, useTheme, Chip } from "@mui/material";
import {
  PieChart, Pie, Cell, Tooltip as RTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area,
} from "recharts";
import KpiCard from "./KpiCard";
import { Devices, Assignment, Build, CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const itemVariants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

const trendData = [
  { month: "Jan", assets: 8,  maintenance: 3 },
  { month: "Feb", assets: 11, maintenance: 5 },
  { month: "Mar", assets: 14, maintenance: 4 },
  { month: "Apr", assets: 17, maintenance: 7 },
  { month: "May", assets: 18, maintenance: 6 },
  { month: "Jun", assets: 20, maintenance: 8 },
];

function SectionCard({ title, subtitle, children, action }) {
  const theme = useTheme();
  return (
    <motion.div variants={itemVariants} style={{ height: "100%" }}>
      <Box sx={{ p: { xs: 2, md: 2.5 }, backgroundColor: "background.paper", borderRadius: "16px", border: `1px solid ${theme.palette.divider}`, height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary", mb: 0.25 }}>{title}</Typography>
            {subtitle && <Typography variant="caption" sx={{ color: "text.secondary" }}>{subtitle}</Typography>}
          </Box>
          {action}
        </Box>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </motion.div>
  );
}

function CustomTooltip({ active, payload, label, theme }) {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: "10px", p: 1.5, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
      {label && <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>{label}</Typography>}
      {payload.map((p, i) => (
        <Typography key={i} variant="caption" sx={{ color: p.color, fontWeight: 600, display: "block" }}>{p.name}: {p.value}</Typography>
      ))}
    </Box>
  );
}

function Dashboard({ assets = [], maintenance = [] }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const totalAssets = assets.length;
  const assignedAssets = assets.filter(a => a.assignedTo).length;
  const availableAssets = totalAssets - assignedAssets;
  const scheduledMaintenance = maintenance.filter(m => m.status === "Scheduled").length;
  const completedMaintenance = maintenance.filter(m => m.status === "Completed").length;
  const underMaintenance = maintenance.filter(m => m.status === "Under Maintenance").length;
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;
  const axisStyle = { fill: theme.palette.text.secondary, fontSize: 11, fontFamily: "Inter" };
  const gridStroke = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const pieData = [
    { name: "Assigned", value: assignedAssets, color: primary },
    { name: "Available", value: availableAssets, color: isDark ? "rgba(255,255,255,0.12)" : "rgba(99,102,241,0.15)" },
  ];
  const maintenanceBarData = [
    { name: "Scheduled", value: scheduledMaintenance, color: warning },
    { name: "Completed", value: completedMaintenance, color: success },
    { name: "In Progress", value: underMaintenance, color: secondary },
  ];
  const typeMap = {};
  assets.forEach(a => { typeMap[a.type] = (typeMap[a.type] || 0) + 1; });
  const typeData = Object.entries(typeMap).map(([name, value]) => ({ name, value }));
  const typeColors = [primary, secondary, success, warning, "#F87171", "#A78BFA", "#34D399", "#60A5FA"];

  const kpis = [
    { title: "Total Assets", value: totalAssets, icon: <Devices />, color: primary },
    { title: "Assigned", value: assignedAssets, icon: <Assignment />, color: secondary },
    { title: "Scheduled", value: scheduledMaintenance, icon: <Build />, color: warning },
    { title: "Completed", value: completedMaintenance, icon: <CheckCircle />, color: success },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0, p: { xs: 2, sm: 2.5, md: 3 }, backgroundColor: "background.default", minHeight: "100vh" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: "text.primary", mb: 0.25 }}>Dashboard</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>Overview of your device management operations</Typography>
      </Box>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">

        {/* KPI Row */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,1fr)", lg: "repeat(4,1fr)" }, gap: 2, mb: 2.5, width: "100%" }}>
          {kpis.map((kpi) => <KpiCard key={kpi.title} {...kpi} />)}
        </Box>

        {/* Charts Row 1 - 3 equal columns */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" }, gap: 2, mb: 2.5, width: "100%" }}>
          <SectionCard title="Asset Distribution" subtitle="Assigned vs Available">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" animationBegin={0} animationDuration={800}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                </Pie>
                <RTooltip content={(props) => <CustomTooltip {...props} theme={theme} />} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: theme.palette.text.secondary, fontSize: "0.78rem", fontFamily: "Inter" }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Maintenance Status" subtitle="Tasks by status">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={maintenanceBarData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
                <RTooltip content={(props) => <CustomTooltip {...props} theme={theme} />} cursor={{ fill: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={800}>
                  {maintenanceBarData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Asset Types" subtitle="Hover to explore">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
              <ResponsiveContainer width="100%" height={175}>
                <PieChart>
                  <Pie
                    data={typeData.length ? typeData : [{ name: "No Data", value: 1 }]}
                    cx="50%" cy="50%"
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={900}
                  >
                    {(typeData.length ? typeData : [{ name: "No Data", value: 1 }]).map((_, i) => (
                      <Cell key={i} fill={typeColors[i % typeColors.length]} stroke="none" />
                    ))}
                  </Pie>
                  <RTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0];
                      const total = typeData.reduce((s, t) => s + t.value, 0);
                      const pct = total ? Math.round((d.value / total) * 100) : 0;
                      const color = typeColors[typeData.findIndex(t => t.name === d.name) % typeColors.length];
                      return (
                        <Box sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: "10px", p: 1.5, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", minWidth: 130 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.82rem" }}>{d.name}</Typography>
                          </Box>
                          <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                            {d.value} asset{d.value !== 1 ? "s" : ""} · {pct}%
                          </Typography>
                        </Box>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", width: "100%", px: 0.5 }}>
                {(typeData.length ? typeData : [{ name: "No Data", value: 1 }]).map((entry, i) => (
                  <Box key={entry.name} sx={{ display: "flex", alignItems: "center", gap: 0.75, overflow: "hidden" }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: typeColors[i % typeColors.length], flexShrink: 0 }} />
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.71rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {entry.name} ({entry.value})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </SectionCard>
        </Box>

        {/* Charts Row 2 - trend + quick stats */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 2, mb: 2.5, width: "100%" }}>
          <SectionCard title="Asset & Maintenance Trend" subtitle="6-month overview" action={<Chip label="Last 6 months" size="small" sx={{ fontSize: "0.7rem", backgroundColor: `${primary}18`, color: primary, fontWeight: 600 }} />}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="gAssets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={primary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={primary} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gMaint" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={warning} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={warning} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
                <RTooltip content={(props) => <CustomTooltip {...props} theme={theme} />} />
                <Area type="monotone" dataKey="assets" name="Assets" stroke={primary} strokeWidth={2} fill="url(#gAssets)" dot={false} animationDuration={800} />
                <Area type="monotone" dataKey="maintenance" name="Maintenance" stroke={warning} strokeWidth={2} fill="url(#gMaint)" dot={false} animationDuration={800} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: theme.palette.text.secondary, fontSize: "0.78rem", fontFamily: "Inter" }}>{v}</span>} />
              </AreaChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Quick Stats" subtitle="At a glance">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 0.5 }}>
              {[
                { label: "Assignment Rate", value: totalAssets ? `${Math.round((assignedAssets / totalAssets) * 100)}%` : "0%", color: primary },
                { label: "Available Assets", value: availableAssets, color: success },
                { label: "Under Maintenance", value: underMaintenance, color: secondary },
                { label: "Total Maintenance", value: maintenance.length, color: warning },
              ].map((stat) => (
                <Box key={stat.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.82rem" }}>{stat.label}</Typography>
                  <Typography variant="subtitle2" sx={{ color: stat.color, fontWeight: 700 }}>{stat.value}</Typography>
                </Box>
              ))}
            </Box>
          </SectionCard>
        </Box>

        {/* Recent Maintenance - full width */}
        <Box sx={{ width: "100%" }}>
          <SectionCard title="Recent Maintenance" subtitle="Latest scheduled tasks">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {maintenance.slice(0, 5).length === 0 ? (
                <Typography variant="body2" sx={{ color: "text.secondary", py: 2, textAlign: "center" }}>No maintenance tasks yet</Typography>
              ) : maintenance.slice(0, 5).map((m) => {
                const cfg = { Scheduled: { color: warning, bg: `${warning}18` }, Completed: { color: success, bg: `${success}18` }, "Under Maintenance": { color: secondary, bg: `${secondary}18` } }[m.status] || { color: "#94A3B8", bg: "#94A3B818" };
                return (
                  <Box key={m.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, borderRadius: "10px", border: `1px solid ${theme.palette.divider}`, backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.85rem" }}>{m.asset}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>{m.type} · {m.scheduledDate}</Typography>
                    </Box>
                    <Chip label={m.status} size="small" sx={{ fontWeight: 600, fontSize: "0.7rem", backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }} />
                  </Box>
                );
              })}
            </Box>
          </SectionCard>
        </Box>

      </motion.div>
    </Box>
  );
}

export default Dashboard;

