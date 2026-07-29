/**
 * @file ActivityBreakdownTable.jsx
 * @description Tabular data presentation layout segment.
 * Renders structured row records parsing fundraising totals and contribution frequency weights per church ministry activity.
 */

import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';

/**
 * ActivityBreakdownTable Metric Grid Component
 * Unpacks aggregated accounting metrics into a clean list view.
 * 
 * @component ActivityBreakdownTable
 * @param {Object} props - Component properties
 * @param {Object[]} props.breakdownData - Source tracking array containing aggregated transaction parameters
 * @param {string} props.breakdownData[].activity - Formal category description title (e.g., Missions, Youth, Building Fund)
 * @param {number} props.breakdownData[].donation_count - Total integer frequency of gifts processed within the ledger window
 * @param {number} props.breakdownData[].total_amount - Net financial currency floating sum calculated across the matching activity block
 * @returns {JSX.Element} Fluid Material UI allocation reporting table layout
 */
export default function ActivityBreakdownTable({ breakdownData }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#0e1b11', mb: 2 }}>
        Fund Allocation by Activity
      </Typography>
      
      {/* Flat baseline data canvas layout containing zero elevation properties to prevent layer overlapping bugs */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #f0f0e8', borderRadius: '12px' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f0f0e8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Church Activity</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">Transaction Count</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Total Funds Raised</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {/* Dynamic data map parser loop context mapping structured row parameters to DOM keys */}
            {breakdownData.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ fontWeight: 500 }}>{row.activity}</TableCell>
                <TableCell align="center">{row.donation_count} gifts</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#1b5e20' }}>
                  {/* Absolute transformation layout rule parsing currency floats to safe financial string outputs */}
                  ${row.total_amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
