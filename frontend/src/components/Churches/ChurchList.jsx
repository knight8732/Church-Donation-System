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
    <Box 
      sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        pt: { xs: "72px", sm: "88px", md: 4 }, // Clears the fixed top navigation bar panel on mobile and tablet viewports
        bgcolor: "#fcfcf9", 
        minHeight: "100vh",
        boxSizing: "border-box"
      }}
    >
      {/* Top Application Execution Header Controls Component Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, 
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
            Churches
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mt: 0.5, wordBreak: "break-word" }}>
            Manage church branch information.
          </Typography>
        </Box>
        <Stack 
          direction="row" 
          spacing={1.5}
          sx={{ flexShrink: 0 }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              bgcolor: "#1b5e20",
              fontWeight: 500,
              whiteSpace: "nowrap",
              width: { xs: "100%", sm: "auto" },
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
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          border: "1px solid #f0f0e8",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.02)",
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden"
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

        {/* High-Performance Material Data Grid Table Wrapper */}
        {/* Removed extra outer box container wrapper to fix horizontal clip truncation bugs */}
        <MaterialReactTable 
          columns={columns} 
          data={churches} 
          enableRowActions 
          positionActionsColumn="last" // Keeps actions securely positioned at the right border wall column
          layoutMode="semantic" // Changed from 'grid' to 'semantic' to allow natural responsive cell sizing and scaling
          muiTableProps={{
            sx: {
              border: '1px solid #e0e0e0',
              tableLayout: 'auto', // Allows cells to size themselves naturally based on data content length
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              borderRight: '1px solid #e0e0e0',
              borderBottom: '2px solid #e0e0e0',
              whiteSpace: 'nowrap', 
              '& .Mui-TableHeadCell-Content': {
                justifyContent: 'flex-start',
              },
            },
          }}
          muiTableCellProps={{
            sx: {
              borderRight: '1px solid #e0e0e0',
              borderBottom: '1px solid #e0e0e0',
              whiteSpace: 'nowrap', 
              overflow: 'hidden',
              textOverflow: 'ellipsis', 
            },
          }}
          muiTableContainerProps={{ 
            sx: { 
              maxWidth: '100%', 
              overflowX: 'auto', // Turns on smooth native horizontal scrolling for columns within the table frame itself
            } 
          }}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Actions',
              size: 110, // Explicit size tracking ensures actions column does not compress or clip out of bounds
              muiTableHeadCellProps: {
                align: 'left',
              },
            },
          }}
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '4px' }}>
              <IconButton 
                component={Link} 
                to={`edit/${row.original.id}`} 
                sx={{ "& .MuiSvgIcon-root": { color: "#1b5e20" } }} 
                title="Edit Church"
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => handleDeleteClick(row.original.id)} 
                sx={{ color: "#d32f2f" }}
                title="Delete Church"
                size="small"
              >
                <DeleteIcon fontSize="small" />
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
