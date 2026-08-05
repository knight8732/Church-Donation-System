/**
 * @file Dashboard.jsx
 * @description Administrative metrics overview displaying financial activity breakdowns.
 * Connects asynchronously to backend transaction aggregation metrics and charts total multi-branch funding.
 */

import React, { useState, useEffect } from "react";
import { 
  Grid, 
  Paper, 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  LinearProgress,
  useTheme,
  useMediaQuery
} from "@mui/material";

import AxiosInstance from "./Axios";

/**
 * Dashboard Component
 * Renders executive summaries, overall collection figures, and granular ministry distributions.
 * 
 * @component Dashboard
 * @returns {JSX.Element} Financial metrics summary layout pane
 */
const Dashboard = () => {
  // Activity metrics state initialization
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Theme responsive breakpoint evaluation hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fallback sanity guard layout protection to eliminate array pointer compilation crashes
  const safeActivityData = Array.isArray(activityData) ? activityData : [];
  
  // Aggregate grand financial sums natively on the engine stack
  const grandTotal = safeActivityData.reduce((sum, item) => sum + item.total_amount, 0);

  // Initial dashboard statistics network data sync pipeline hook
  useEffect(() => {
    AxiosInstance.get("/donations/activity-breakdown/")
      .then((response) => {
        setActivityData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard statistics:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#fcfcf9", minHeight: "100vh" }}>
      {/* Dashboard Dynamic Title Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          sx={{ fontWeight: 700, color: "#0e1b11", mb: 0.5 }}
        >
          Financial Insights Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: "#666" }}>
          Overview of church collections and allocations for {new Date().getFullYear()}.
        </Typography>
      </Box>

      {/* Network Processing State Evaluator Block */}
      {loading ? (
        <LinearProgress sx={{ bgcolor: "#f0f0e8", "& .MuiLinearProgress-bar": { bgcolor: "#1b5e20" } }} />
      ) : (
        <Grid container spacing={3}>
          {/* Summary Metric Block Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper 
              elevation={0} 
              sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: "16px", border: "1px solid #f0f0e8", bgcolor: "#ffffff" }}
            >
              <Typography variant="subtitle2" sx={{ color: "#666", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Total Annual Funding
              </Typography>
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                sx={{ fontWeight: 800, color: "#1b5e20", mt: 1, wordBreak: "break-word" }}
              >
                ${grandTotal.toFixed(2)}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>
                Combined active revenue lines tracking across ministries.
              </Typography>
            </Paper>
          </Grid>

          {/* Granular Fund Allocation Ledger Display */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper 
              elevation={0} 
              sx={{ p: { xs: 2, sm: 3 }, borderRadius: "16px", border: "1px solid #f0f0e8", bgcolor: "#ffffff" }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#0e1b11", mb: 2 }}>
                Fund Allocation by Activity ({new Date().getFullYear()})
              </Typography>
              <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
                <Table size={isMobile ? "medium" : "small"}>
                  <TableHead sx={{ bgcolor: "#f0f0e8" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, borderRadius: "8px 0 0 8px", py: 1.5 }}>Church Activity</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="center">Offerings</TableCell>
                      <TableCell sx={{ fontWeight: 600, borderRadius: "0 8px 8px 0" }} align="right">Total Raised</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Render standard empty view if array is cleared */}
                    {safeActivityData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary", fontStyle: "italic" }}>
                          No donation entries found for this calendar window.
                        </TableCell>
                      </TableRow>
                    ) : (
                      // Dynamic record map execution loop block context
                      safeActivityData.map((row, index) => (
                        <TableRow key={index} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          <TableCell sx={{ fontWeight: 600, py: 1.5, whiteSpace: "nowrap" }}>{row.activity}</TableCell>
                          <TableCell align="center" sx={{ color: "#666", whiteSpace: "nowrap" }}>{row.donation_count}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700, color: '#1b5e20', whiteSpace: "nowrap" }}>
                            ${row.total_amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
