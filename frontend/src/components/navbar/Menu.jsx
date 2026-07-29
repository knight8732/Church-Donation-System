/**
 * @file Menu.jsx
 * @description Master navigation menu controller for the administrative panel.
 * Handles primary links, expanding/collapsing sub-sections, and tracking active page states.
 */

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import ChurchIcon from "@mui/icons-material/Church";
import DonationIcon from "@mui/icons-material/AttachMoney";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddHomeIcon from "@mui/icons-material/AddHome";

/**
 * Menu Component
 * Renders list paths, handles responsive tooltips, and tracks navigation styling.
 * 
 * @component Menu
 * @param {Object} props - React properties inherited from the navigation parent layout shell
 * @param {boolean} props.isCollapsed - Structural flag indicating if the navigation pane is narrow
 * @param {Function} props.setIsCollapsed - Callback mutation function to alter sidebar size states
 * @returns {JSX.Element} The rendered navigation menu layout block
 */

export default function Menu({ isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

// Local state controls tracking accordion open status for deep module sections
  const [openMembers, setOpenMembers] = useState(true);
  const [openChurch, setOpenChurch] = useState(false);
  const [openDonation, setOpenDonation] = useState(false);

 // Core layout metrics tied directly to root width properties
  const sidebarWidth = isCollapsed ? 80 : 280;
  const buttonSize = 24;

  /**
 * Primary Navigation Node Style Parameters
 * Implements custom hover behaviors that slide open link titles smoothly.
 */
  const activeStyles = {
    borderRadius: "12px",
    mb: 0.5,
    py: 1.2,
    px: isCollapsed ? 0 : 2,
    justifyContent: isCollapsed ? "center" : "flex-start",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    "&.Mui-selected": {
      bgcolor: "#447a48",
      color: "#fff",
      border: isCollapsed ? "none" : "1.5px solid #fff",
      transform: "scale(1.02)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    "&.Mui-selected:hover": {
      bgcolor: "#4d8751",
      transform: "scale(1.02)",
    },
    "&:hover": {
      color: "#fff",
      bgcolor: "rgba(255, 255, 255, 0.08)",
      paddingLeft: isCollapsed ? "0px" : "20px",
    },
    "&:active": {
      transform: "scale(0.98)",
    },
  };

  /**
   * Nested Sub-Menu Link Style Parameters
   * Lower visual weight variables optimized to group child directory pages cleanly.
   */
  const nestedStyles = {
    pl: isCollapsed ? 0 : 4,
    justifyContent: isCollapsed ? "center" : "flex-start",
    borderRadius: "12px",
    mb: 0.5,
    py: 1,
    color: "rgba(255, 255, 255, 0.6)",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&.Mui-selected": {
      bgcolor: "rgba(255, 255, 255, 0.12)",
      color: "#fff",
    },
    "&.Mui-selected:hover": {
      bgcolor: "rgba(255, 255, 255, 0.18)",
    },
    "&:hover": {
      color: "#fff",
      bgcolor: "rgba(255, 255, 255, 0.06)",
      pl: isCollapsed ? 0 : 4.5,
    },
  };

  /**
   * Action Link Layout Item Builder
   * Factory utility wrapper that dynamically binds custom material tooltips during compact views.
   */
  const renderItemButton = (label, icon, onClick, selected, styles) => {
    const buttonContent = (
      <ListItemButton onClick={onClick} selected={selected} sx={styles}>
        <ListItemIcon
          sx={{
            minWidth: isCollapsed ? "auto" : 40,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        {!isCollapsed && (
          <ListItemText
            primary={
              <Typography
                sx={{
                  fontSize: styles === nestedStyles ? "0.9rem" : "1rem",
                  fontWeight: selected ? 600 : 400,
                }}
              >
                {label}
              </Typography>
            }
          />
        )}
      </ListItemButton>
    );

    // Wraps button in tooltip element container if sidebar context is collapsed narrow
    return isCollapsed ? (
      <Tooltip title={label} placement="right" arrow key={label}>
        {buttonContent}
      </Tooltip>
    ) : (
      buttonContent
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
        width: `${sidebarWidth}px`, // Dynamically driven via computed parameters
        bgcolor: "#0e1b11",
        transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "visible", // Ensures absolute float control buttons render past outer canvas parameters
        "& .MuiList-root": { overflow: "visible" },
      }}
    >
      {/* Sidebar Top Application Identity Header Block */}
      <ListItem
        sx={{
          pt: 3,
          pb: 4,
          px: isCollapsed ? 1.5 : 2,
          transition: "padding 0.25s",
        }}
      >
        <ListItemAvatar sx={{ minWidth: isCollapsed ? "auto" : 56 }}>
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: "#4e774f",
              color: "#fff",
              width: 48,
              height: 48,
              borderRadius: "12px",
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              "&:hover": { transform: "rotate(5deg) scale(1.05)" }, // Playful alignment rotation accent
            }}
          >
            <ChurchIcon sx={{ fontSize: 28 }} />
          </Avatar>
        </ListItemAvatar>
        {!isCollapsed && (
          <ListItemText
            primary={
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "#fff", lineHeight: 1.2 }}
              >
                Church
              </Typography>
            }
            secondary={
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.5)" }}
              >
                Donation Management System
              </Typography>
            }
          />
        )}
      </ListItem>

       {/* Edge Toggle Circle Button (Calculates dynamic layout line positioning overlap physics) */}
      <IconButton
        onClick={() => setIsCollapsed(!isCollapsed)}
        sx={{
          position: "absolute",
          left: `${sidebarWidth - buttonSize / 2}px`, // Splits alignment center points cleanly down the border edge
          top: 105,
          bgcolor: "#3e8343",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          width: buttonSize,
          height: buttonSize,
          zIndex: 1300, // Forces button to float securely above other structural components
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            bgcolor: "#006915",
            transform: "scale(1.15)",
          },
          "& .MuiSvgIcon-root": { fontSize: 16 },
        }}
      >
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>

      {/* Main Navigation Links Group Layer */}
      <List
        sx={{
          width: "100%",
          px: isCollapsed ? 1 : 2,
          bgcolor: "transparent",
          color: "rgba(255, 255, 255, 0.7)",
          "& .MuiListItemIcon-root": {
            color: "inherit",
          },
        }}
        component="nav"
      >
        {/* Dashboard Link */}
        {renderItemButton(
          "Dashboard",
          <Dashboard />,
          () => navigate("/"),
          location.pathname === "/",
          activeStyles,
        )}

        {/* --- MEMBERS SECTION --- */}
        {isCollapsed ? (
          renderItemButton(
            "Members",
            <Person />,
            () => {
              setIsCollapsed(false);
              setOpenMembers(true);
            },
            false,
            activeStyles,
          )
        ) : (
          <ListItemButton
            onClick={() => setOpenMembers(!openMembers)}
            sx={activeStyles}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Person />
            </ListItemIcon>
            <ListItemText primary={<Typography>Members</Typography>} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                transform: openMembers ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              <ExpandMore sx={{ color: "#fff" }} />
            </Box>
          </ListItemButton>
        )}

        {/* Members Sub-Level Items */}
        <Collapse in={openMembers && !isCollapsed} timeout={300} unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ "& .MuiListItemIcon-root": { minWidth: 32 } }}
          >
            {renderItemButton(
              "View Members",
              <ViewListIcon fontSize="small" />,
              () => navigate("/members"),
              location.pathname === "/members",
              nestedStyles,
            )}
            {renderItemButton(
              "Add Member",
              <PersonAddAlt1Icon fontSize="small" />,
              () => navigate("/create-members"),
              location.pathname === "/create-members",
              nestedStyles,
            )}
          </List>
        </Collapse>

        {/* --- CHURCHES SECTION --- */}
        {isCollapsed ? (
          renderItemButton(
            "Church",
            <ChurchIcon />,
            () => {
              setIsCollapsed(false);
              setOpenChurch(true);
            },
            false,
            activeStyles,
          )
        ) : (
          <ListItemButton
            onClick={() => setOpenChurch(!openChurch)}
            sx={activeStyles}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ChurchIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography>Church</Typography>} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                transform: openChurch ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              <ExpandMore sx={{ color: "#fff" }} />
            </Box>
          </ListItemButton>
        )}
        {/* Church Sub-Level Items */}
        <Collapse in={openChurch && !isCollapsed} timeout={300} unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ "& .MuiListItemIcon-root": { minWidth: 32 } }}
          >
            {renderItemButton(
              "Church Overview",
              <ChurchIcon fontSize="small" />,
              () => navigate("/churches"),
              location.pathname === "/churches",
              nestedStyles,
            )}
            {renderItemButton(
              "Add Church",
              <AddHomeIcon fontSize="small" />,
              () => navigate("/create-churches"),
              location.pathname === "/create-churches",
              nestedStyles,
            )}
          </List>
        </Collapse>

        {/* --- DONATIONS SECTION --- */}
        {isCollapsed ? (
          renderItemButton(
            "Donation",
            <DonationIcon />,
            () => {
              setIsCollapsed(false);
              setOpenDonation(true);
            },
            false,
            activeStyles,
          )
        ) : (
          <ListItemButton
            onClick={() => setOpenDonation(!openDonation)}
            sx={activeStyles}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DonationIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography>Donation</Typography>} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                transform: openDonation ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              <ExpandMore sx={{ color: "#fff" }} />
            </Box>
          </ListItemButton>
        )}
        {/* Donation Sub-Level Items */}
        <Collapse in={openDonation && !isCollapsed} timeout={300} unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ "& .MuiListItemIcon-root": { minWidth: 32 } }}
          >
            {renderItemButton(
              "Donation Overview",
              <DonationIcon fontSize="small" />,
              () => navigate("/donations"),
              location.pathname === "/donations",
              nestedStyles,
            )}
            {renderItemButton(
              "Add Donation",
              <AddCardIcon fontSize="small" />,
              () => navigate("/create-donations"),
              location.pathname === "/create-donations",
              nestedStyles,
            )}
          </List>
        </Collapse>
      </List>

      {/* Footer Copyright Text Component */}
      <Box
        sx={{ mt: "auto", pb: 2, textAlign: "center", width: "100%", px: 1 }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.3)",
            display: isCollapsed ? "none" : "block",
          }}
        >
          © 2026 Church System
        </Typography>
      </Box>
    </Box>
  );
}
