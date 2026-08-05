/**
 * @file App.jsx
 * @description Core entry wrapper of the Church Donation & Member Management platform.
 * Establishes global typography/form styling schemas, registers routes, and anchors core layouts.
 */

import { useState } from 'react'
import { Routes, Route } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import './App.css'

// Core Modules & Navigation Layouts
import Dashboard from './components/Dashboard'
import Navbar from './components/navbar/Navbar'

// Member Management Components
import MemberList from './components/Members/MemberList'
import CreateMember from './components/Members/CreateMember'
import EditMember from './components/Members/EditMember'

// Church Management Components
import ChurchList from './components/Churches/ChurchList'
import CreateChurch from './components/Churches/CreateChurch'
import EditChurches from './components/Churches/EditChurch'

// Donation Management Components
import DonationList from './components/Donations/DonationList'
import CreateDonation from './components/Donations/CreateDonation'
import EditDonation from './components/Donations/EditDonation'

/**
 * Custom Material UI Application Theme Configuration
 * Implements a deep forest-green palette design scheme paired with unified input fields.
 */
const theme = createTheme({
  palette: {
    primary: {
      light: '#447a48',
      main: '#091910', // Brand identity deep green
      dark: '#050f0a',
      contrastText: '#fff',
    },
  },
  // Global responsive font scaling layers
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      '@media (max-width:600px)': { fontSize: '1.75rem' }, // Shrinks on extra-small mobile
    },
    h4: {
      '@media (max-width:600px)': { fontSize: '1.5rem' },
    },
    h5: {
      '@media (max-width:600px)': { fontSize: '1.25rem' },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Matches input wrapper curves
          paddingTop: "10px",   // Increases overall thumb engagement footprint
          paddingBottom: "10px",
          textTransform: "none",
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingTop: "14px",   // Keeps line alignments perfectly level with text inputs
          paddingBottom: "14px",
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          marginBottom: "20px", // Margins shrunk slightly to preserve display height on mobile
          width: "100%",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#f8f9f8",
            borderRadius: "12px", // Unified rounded container layout pattern
            transition: "all 0.2s ease-in-out",
            "& fieldset": {
              borderColor: "#e8ebe8",
            },
            "&:hover fieldset": {
              borderColor: "#cbd2cb",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#447a48", // Accent color focus confirmation border
              borderWidth: "2px",
            },
          },
          "& .MuiInputBase-input": {
            paddingTop: "14px",   // Elevated from 12px to adhere to 48px minimal touch-target scale rules
            paddingBottom: "14px",
            paddingLeft: "16px",
            paddingRight: "16px",
            color: "#1a1a1a",
            fontSize: "1rem",     // Minimum 16px font standard to eliminate layout forcing auto-zooms on iOS Safari
            "&::placeholder": {
              color: "#8b948b",
              opacity: 1,
            },
          },
        },
      },
    },
  },
});

/**
 * Core Application Router Entry Point Component
 * Sets up global themes and injects safe data routers through the Navbar structure container.
 * 
 * @component App
 * @returns {JSX.Element} The rendered global container hierarchy tree
 */
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Reset browser baseline stylesheets seamlessly to eliminate spacing inconsistencies */}
        <CssBaseline />
        <Navbar 
          content={
            <Routes>
              {/* Home & System Metrics Summary */}
              <Route path="/" element={<Dashboard />} />
              
              {/* Member Operations Pipeline */}
              <Route path="/members" element={<MemberList />} />
              <Route path="/members/edit/:id" element={<EditMember />} />
              <Route path="/create-members" element={<CreateMember />} />
              
              {/* Parish & Church Branch Operations */}
              <Route path="/churches" element={<ChurchList />} />
              <Route path="/create-churches" element={<CreateChurch />} />
              <Route path="/churches/edit/:id" element={<EditChurches />} />
              
              {/* Financial Offerings Transaction Ledger */}
              <Route path="/donations" element={<DonationList />} />
              <Route path="/create-donations" element={<CreateDonation />} />
              <Route path="/donations/edit/:id" element={<EditDonation />} />
            </Routes>
          }
        />
      </ThemeProvider>
    </>
  )
}

export default App
