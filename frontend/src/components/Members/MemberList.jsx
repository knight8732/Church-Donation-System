/**
 * @file MemberList.jsx
 * @description Master data table panel rendering the global church member directory dashboard.
 * Coordinates batch document compilation routines, deletion confirmation pipelines, and asynchronous reads.
 */

import { React, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddIcon from "@mui/icons-material/Add";
import AxiosInstance from "../Axios";
import { MaterialReactTable } from 'material-react-table';
import AlertDialog from "../Forms/AlertDialog";
import { generateAllReceipts } from "../Forms/GenerateDocument";

/**
 * MemberList Component
 * Controls table listings, hooks inline row item operations, and invokes document generation streams.
 * 
 * @component MemberList
 * @returns {JSX.Element} The primary member management board view panel
 */
export default function MemberList() {
  const [delete_message, setDeleteMessage] = useState("");
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  // Modal alert dialog viewport layout controllers
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const currentYear = new Date().getFullYear();

  /**
   * Triggers background batch generation to extract structural DOCX tax logs for the entire collection dataset.
   */
  const handleGenerateAllReceipts = () => {
    generateAllReceipts(members);
  };

  /**
   * Targets record unique primary keys, verifies row items asynchronously, and opens warning confirmation prompts.
   * @param {number|string} id - The database unique primary key of the target member row to drop.
   */
  const handleDeleteClick = (id) => {
    setSelectedMemberId(id);

    AxiosInstance.get(`members/${id}/`).then((response) => {
      setDeleteMessage([
        `You are about to delete: ${response.data.full_name}. `,
        "Please click delete if you are sure."
      ]);
    });

    setDeleteDialogOpen(true);
  };

  /**
   * Commits the structural DELETE request via HTTP endpoints and updates local component arrays upon fulfillment.
   */
  const handleConfirmDelete = () => {
    AxiosInstance.delete(`members/${selectedMemberId}/`)
      .then(() => {
        setDeleteDialogOpen(false);
        GetMembers();
      });
  };
  
  /**
   * Refreshes the target application state hook by pulling direct member datasets from live backends.
   */
  const GetMembers = () => {
    AxiosInstance.get('members/').then((response) => {
      setMembers(response.data);
    });
  };

  // Sync state data layers concurrently upon layout instantiation loops
  useEffect(() => {
    GetMembers();
  }, []);

  /**
   * MaterialReactTable Core Column Schema Configuration Maps
   * Dictates sub-object lookups, access chains, cell transformation formatters, and baseline boundaries.
   */
  const columns = useMemo(
    () => [
      {
        accessorKey: 'full_name',
        header: 'Full Name'
      },
      {
        accessorKey: 'email',
        header: 'Email'
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone Number',
      },
      {
        accessorKey: 'address',
        header: 'Address'
      },
      {
        accessorKey: 'church_detail.name', // Nested relation value access pipeline chain path
        header: 'Church',
      },
      {
        accessorKey: 'annual_donations',
        header: 'Annual Offerings',
        // In-line cell evaluation renderer formatting raw string floats safely to absolute localized currency logs
        Cell: ({ cell }) => {
          const value = parseFloat(cell.getValue());
          return isNaN(value) ? '$0.00' : `$${value.toFixed(2)}`;
        }
      },
      {
        accessorKey: 'joined_date',
        header: 'Joined Date',
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
            Members
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
            Manage your church members and their information.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={handleGenerateAllReceipts} 
            disabled={members.length === 0} // Disables interaction if the member array dataset is empty
            sx={{
              textTransform: "none",
              borderColor: "#e0e0e0",
              color: "#333",
              fontWeight: 500,
              "&:hover": { borderColor: "#b5b5b5", bgcolor: "#f5f5f5" },
            }}

          >
            Generate All Receipts
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              bgcolor: "#1b5e20",
              fontWeight: 500,
              "&:hover": { bgcolor: "#144517" },
            }}
            onClick={() => navigate("/create-members")}
          >
            Add Member
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
              Member Directory
            </Typography>
            <Typography variant="caption" sx={{ color: "#777" }}>
              A list of all church members and their contact information.
            </Typography>
          </Box>
        </Box>

        {/* Unified High-Performance Material Data Grid Table Wrapper */}
        <MaterialReactTable 
          columns={columns} 
          data={members} 
          enableRowActions
          positionActionsColumn="last" // Locks transactional actions securely to the right border wall column
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Actions',
              size: 160, // Enforces dedicated spatial padding definitions to eliminate element text wrapping blocks
            },
          }}
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'nowrap' }}>
              {/* Isolated Downloader Row Context Node */}
              <IconButton 
                onClick={() => generateAllReceipts([row.original])}
                sx={{ "& .MuiSvgIcon-root": { color: "#1b5e20" } }}
                title="Download Individual Receipt"
              >
                <FileDownloadOutlinedIcon />
              </IconButton>
              <IconButton 
                onClick={() => navigate("edit/" + row.original.id)} // Dynamic path concatenation to circumvent regex interpreter errors
                title="Edit Member"
              >
                <EditIcon color="primary" />
              </IconButton>
              <IconButton 
                onClick={() => handleDeleteClick(row.original.id)}
                title="Delete Member"
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          )}
        />
      </Paper>

      {/* Safety Overlaid Confirmation Interceptor Modal */}
      <AlertDialog
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        title="Delete Member"
        message={delete_message}
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
