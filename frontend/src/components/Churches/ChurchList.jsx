/**
 * @file ChurchList.jsx
 * @description Master data table panel rendering the global church branches directory.
 * Manages branch profile displays, operational status tracking, and safe confirmation deletion loops.
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
 * ChurchList Directory Component
 * Coordinates multi-branch listings, handles data grid styles, and hooks record mutation processes.
 * 
 * @component ChurchList
 * @returns {JSX.Element} The primary church branch management grid panel view
 */
export default function ChurchList() {
  const [delete_message, setDeleteMessage] = useState("");
  const navigate = useNavigate();
  const [churches, setchurches] = useState([]);

  // Modal alert dialog viewport layout controllers
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedChurchId, setSelectedChurchId] = useState(null);

  /**
   * Targets record unique primary keys, verifies row items asynchronously, and opens warning confirmation prompts.
   * @param {number|string} id - The database unique primary key of the target branch row to drop.
   */
  const handleDeleteClick = (id) => {
    setSelectedChurchId(id);

    AxiosInstance.get(`churches/${id}/`).then((response) => {
      setDeleteMessage([
        `You are about to delete: ${response.data.name}. `,
        "Please click delete if you are sure."
      ]);
    });

    setDeleteDialogOpen(true);
  };

  /**
   * Commits the structural DELETE request via HTTP endpoints and updates local component arrays upon fulfillment.
   */
  const handleConfirmDelete = () => {
    AxiosInstance.delete(`churches/${selectedChurchId}/`)
      .then(() => {
        setDeleteDialogOpen(false);
        Getchurches();
      });
  };
  
  /**
   * Refreshes the target application state hook by pulling direct branch datasets from live backends.
   */
  const Getchurches = () => {
    AxiosInstance.get('churches/').then((response) => {
      setchurches(response.data);
    });
  };

  // Sync state data layers concurrently upon layout instantiation loops
  useEffect(() => {
    Getchurches();
  }, []);

  /**
   * MaterialReactTable Core Column Schema Configuration Maps
   * Dictates sub-object lookups, access chains, cell transformation formatters, and baseline boundaries.
   */
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'pastor',
        header: 'Pastor/ Leader',
        size: 120,
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone Number',
        size: 130,
      },
      {
        accessorKey: 'address',
        header: 'Address'
      },
      {
        accessorKey: 'status',
        header: 'Status',
        // Converts technical boolean flag properties instantly into contextual operational phrases
        Cell: ({ cell }) => {
          return cell.getValue() === true ? 'Active' : 'Inactive';
        },
        size: 100,
      },
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
            Churches
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
            Manage church branch information.
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
            onClick={() => navigate("/create-churches")}
          >
            Add Church
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
              Church Directory
            </Typography>
            <Typography variant="caption" sx={{ color: "#777" }}>
              A list of all churches and the information related to it.
            </Typography>
          </Box>
        </Box>

        {/* Unified High-Performance Material Data Grid Table Wrapper */}
        <MaterialReactTable 
          columns={columns} 
          data={churches} 
          enableRowActions 
          positionActionsColumn="last" // Locks actions securely to the right border wall column
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
              whiteSpace: 'nowrap', // Prevents titles from breaking into weird multi-line words
              '& .Mui-TableHeadCell-Content': {
                justifyContent: 'flex-start',
              },
            },
          }}
          muiTableCellProps={{
            sx: {
              borderRight: '1px solid #e0e0e0',
              borderBottom: '1px solid #e0e0e0',
              whiteSpace: 'nowrap', // Keeps text elements on a single clean line
              overflow: 'hidden',
              textOverflow: 'ellipsis', // Adds "..." if text overflows column size bounds
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
                to={`edit/${row.original.id}`} // Router configuration link destination pathway
                sx={{ "& .MuiSvgIcon-root": { color: "#1b5e20" } }} 
                title="Edit Church"
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={() => handleDeleteClick(row.original.id)} 
                sx={{ color: "#d32f2f" }}
                title="Delete Church"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )} 
        />
      </Paper>

      {/* Safety Overlaid Confirmation Interceptor Modal */}
      <AlertDialog
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        title="Delete Church Branch Record"
        message={delete_message}
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
