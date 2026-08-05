/**
 * @file Navbar.jsx
 * @description Main structural responsive shell layout for the administrative interface.
 * Implements a permanent sidebar navigation drawer for desktop alongside a fluid mobile-responsive layout shell.
 */

import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./Menu";

/**
 * Navbar App Shell Layout Component
 * Orchestrates global viewport adjustments when the navigation menu expands or collapses across mobile and desktop.
 * 
 * @component Navbar
 * @param {Object} props - React properties passed into layout container hooks
 * @param {React.ReactNode} props.content - Dynamically rendered sub-views and active page routers
 * @returns {JSX.Element} Responsive global layout shell tree
 */
export default function Navbar({ content }) {
  // Shared structural toggle flag to unify animations between content boards and menu buttons
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // State hook to control the mobile-specific overlay drawer viewport
  const [mobileOpen, setMobileOpen] = useState(false);

  // Theme responsive breakpoint evaluation hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Tablet and phone check

  // Computes pixel boundaries dynamically to push main screens horizontally on desktop
  const currentDrawerWidth = isMobile ? 280 : (isCollapsed ? 80 : 280);

  /**
   * Toggles the overlay navigation panel visible state stack on smaller touch screens
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fcfcf9" }}>
      
      {/* Mobile Top Navigation App Header Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            bgcolor: "#0e1b11", // Overrides default background to preserve brand colors
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          <Toolbar sx={{ height: 64, px: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, p: 1.5 }} // Increases touch target size to 48px standard
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600, letterSpacing: "0.5px" }}>
              Church Administration
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Responsive Viewport Navigation Drawer System Wrapper */}
      <Box
        component="nav"
        sx={{ width: { md: currentDrawerWidth }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          /* Mobile Overlapping Draw Engine Container */
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Optimizes background layout rendering speeds on iOS Safari devices
            }}
            sx={{
              display: { xs: "block", md: "none" },
              [`& .MuiDrawer-paper`]: {
                width: currentDrawerWidth,
                boxSizing: "border-box",
                bgcolor: "#0e1b11",
                color: "#fff",
                borderRight: "none",
              },
            }}
          >
            {/* Closes mobile menu panel frame context tree directly upon option selection clicks */}
            <Box onClick={handleDrawerToggle}>
              <Menu isCollapsed={false} setIsCollapsed={() => {}} />
            </Box>
          </Drawer>
        ) : (
          /* Desktop Permanent Sidebar Structural Navigation Container */
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              width: currentDrawerWidth,
              flexShrink: 0,
              whiteSpace: "nowrap",
              overflow: "visible",
              transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              [`& .MuiDrawer-paper`]: {
                width: currentDrawerWidth,
                boxSizing: "border-box",
                bgcolor: "#0e1b11",
                color: "#fff",
                borderRight: "none",
                transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "visible",
              },
            }}
          >
            <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          </Drawer>
        )}
      </Box>

      {/* Dynamic Main Page Content Display Screen Box Block */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: { xs: "88px", md: 3 }, // Offsets main content downward on mobile screens so it clears the Top Bar
          minHeight: "100vh",
          width: { 
            xs: "100%", 
            md: `calc(100% - ${currentDrawerWidth}px)` 
          },
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden" // Prevents child components from leaking horizontal layout gaps
        }}
      >
        {content}
      </Box>
    </Box>
  );
}
