/**
 * @file Navbar.jsx
 * @description Main structural responsive shell layout for the administrative interface.
 * Implements a permanent sidebar navigation drawer alongside a fluid main content panel viewport.
 */

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Menu from "./Menu";

/**
 * Navbar App Shell Layout Component
 * Orchestrates global viewport adjustments when the navigation menu expands or collapses.
 * 
 * @component Navbar
 * @param {Object} props - React properties passed into layout container hooks
 * @param {React.ReactNode} props.content - Dynamically rendered sub-views and active page routers
 * @returns {JSX.Element} Responsive global layout shell tree
 */
export default function Navbar({ content }) {
  // Shared structural toggle flag to unify animations between content boards and menu buttons
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Computes pixel boundaries dynamically to push main screens horizontally without grid layout breaking
  const currentDrawerWidth = isCollapsed ? 80 : 280;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Structural Desktop Side Navigation Container */}
      <Drawer
        variant="permanent"
        sx={{
          width: currentDrawerWidth, // Resizes outer layout placeholder boundaries to control surrounding bounds
          flexShrink: 0,
          whiteSpace: "nowrap",
          overflow: "visible",
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)", // Fluid hardware-accelerated movement curve
          [`& .MuiDrawer-paper`]: {
            width: currentDrawerWidth, // Compresses visible painted panel backgrounds natively
            boxSizing: "border-box",
            bgcolor: "#0e1b11", // Corporate deep forest green navigation palette accent
            color: "#fff",
            borderRight: "none",
            transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "visible", // Ensures floating toggle action nodes overlap bounds without clipping
          },
        }}
      >
        {/* Isolated Action Links list and collapse trigger layout controllers */}
        <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </Drawer>
      
      {/* Dynamic Main Page Content Display Screen Box Block */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
          bgcolor: "#fcfcf9",
          // Calculate grid sizes natively to avoid horizontal scrollbar leaks on fluid panels
          width: `calc(100% - ${currentDrawerWidth}px)`,
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {content}
      </Box>
    </Box>
  );
}
