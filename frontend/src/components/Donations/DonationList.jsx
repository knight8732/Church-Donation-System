/**
 * @file DonationList.jsx
 * @description Master ledger data table interface tracking financial church offerings.
 * Provides nested relational directory rendering, transaction updates, and safe interceptor deletion loops.
 */

import { React, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AxiosInstance from "../Axios";
import { MaterialReactTable } from 'material-react-table';
import { Link } from "react-router";
import AlertDialog from "../Forms/AlertDialog";

/**
 * DonationList Core Table Component
 * Coordinates offering directory views, tracks numeric data formatters, and maps row mutation actions.
 * 
 * @component DonationList
 * @returns {JSX.Element} Continuous accounting transaction ledger pane view
 */
export default function DonationList() {
  const [delete_message, setDeleteMessage] = useState("");
  const navigate = useNavigate();
  const [donations, setdonations] = useState([]);

  // Modal target interception state controls
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);

  /**
   * Targets record IDs, loads transaction metadata details asynchronously, and initializes delete confirmations.
   * @param {number|string} id - Database transaction row unique key
   */
  const handleDeleteClick = (id) => {
    setSelectedDonationId(id);

    AxiosInstance.get(`donations/${id}/`).then((response) => {
      // Safely falls back onto member identity parameters if name schemas are blank
      const donorName = response.data.member_detail?.full_name || "this contribution record";
      setDeleteMessage([
        `You are about to delete the entry for: ${donorName}. `,
        "Please click delete if you are sure."
      ]);
    });

    setDeleteDialogOpen(true);
  };

  /**
   * Submits a DELETE request via HTTP endpoints and refreshes local state on success response loops.
   */
  const handleConfirmDelete = () => {
    AxiosInstance.delete(`donations/${selectedDonationId}/`)
      .then(() => {
        setDeleteDialogOpen(false);
        Getdonations();
      });
  };
  
  /**
   * Queries base records to synchronize active collection tables with cloud datasets.
   */
  const Getdonations = () => {
    AxiosInstance.get('donations/').then((response) => {
      setdonations(response.data);
    });
  };

  // Sync state data layers concurrently upon layout instantiation loops
  useEffect(() => {
    Getdonations();
  }, []);

  /**
   * MaterialReactTable Core Column Schema Configurations
   * Maps nested sub-relation paths to flat textual definitions and formats currency properties.
   */
  const columns = useMemo(
    () => [
      {
        accessorKey: 'member_detail.full_name', // Direct access pipeline tracing deep nested profile parameters
        header: 'Member Name'
      },
      {
        accessorKey: 'member_detail.church_detail.name', // Accesses related branch node locations via member schemas
        header: 'Church',
      },
      {
        accessorKey: 'amount',
        header: 'Offering',
        // In-line cell evaluation renderer formatting raw string floats safely to absolute localized currency logs
        Cell: ({ cell }) => {
          const value = parseFloat(cell.getValue());
          return isNaN(value) ? '$0.00' : `$${value.toFixed(2)}`;
        }
      },
      {
        accessorKey: 'donation_date',
        header: 'Date',
        // Sanitizes timestamp formats to isolate simple calendar outputs ('YYYY-MM-DD')
        Cell: ({ cell }) => cell.getValue()?.split('T')[0] || 'N/A'
      }
    ],
    []
  );

  return (
    <Box sx={{ p: 4, bgcolor: "#fcfcf9", minHeight: "100vh" }}>
      {/* Top Application Execution Header Controls Component Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
            Donations
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
            Manage and audit church funding ledger streams.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              bgcolor: "#1b5e20",
              fontWeight: 500,
              "&:hover": { bgcolor: "#144517" },
            }}
            onClick={() => navigate("/create-donations")}
          >
            Add Donation
          </Button>
        </Stack>
      </Box>

      {/* Main Administrative Directory Record Surface Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid #f0f0e8",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.02)",
        }}
      >
        {/* Secondary Inner Section Identity Header Meta Block */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "#222" }}
            >
              Donation Directory
            </Typography>
            <Typography variant="caption" sx={{ color: "#777" }}>
              A list of all member's donations by member and the church they belong.
            </Typography>
          </Box>
        </Box>

        {/* High-Performance Material Data Grid Table Wrapper */}
        <MaterialReactTable 
          columns={columns} 
          data={donations} 
          enableRowActions 
          positionActionsColumn="last"
          layoutMode="grid"
          muiTableProps={{
            sx: {
              border: '1px solid #e0e0e0', 
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              borderRight: '1px solid #e0e0e0',
              borderBottom: '2px solid #e0e0e0',
              whiteSpace: 'nowrap', // Prevents headers from clipping into multi-line strings
              '& .Mui-TableHeadCell-Content': {
                justifyContent: 'flex-start',
              },
            },
          }}
          muiTableCellProps={{
            sx: {
              borderRight: '1px solid #e0e0e0',
              borderBottom: '1px solid #e0e0e0',
              whiteSpace: 'nowrap', // Guarantees entries occupy clean single tracking lines
              overflow: 'hidden',
              textOverflow: 'ellipsis', // Appends '...' truncation when strings overflow boundary fields
            },
          }}
          muiTableContainerProps={{ 
            sx: { 
              maxWidth: '100%', 
              overflowX: 'auto',
              display: 'block'
            } 
          }}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Actions',
              size: 110, // Explicitly sized padding boundary avoids action element overlap bugs
              muiTableHeadCellProps: {
                align: 'left',
              },
            },
          }}
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <IconButton 
                component={Link} 
                to={`edit/${row.original.id}`} // Straight router link binding for seamless template transition shifts
                sx={{ "& .MuiSvgIcon-root": { color: "#1b5e20" } }} 
                title="Edit Entry"
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={() => handleDeleteClick(row.original.id)} 
                sx={{ color: "#d32f2f" }}
                title="Delete Entry"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )} 
        />
      </Paper>

      {/* Safety Interceptor Overlaid Dialog Prompt Component */}
      <AlertDialog
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        title="Delete Donation Record"
        message={delete_message}
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
