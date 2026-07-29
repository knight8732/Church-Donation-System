/**
 * @file CreateMember.jsx
 * @description Form management view for onboarding new church members.
 * Implements Formik validation, dynamic church endpoint lookups, and clear input validation.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextForm from "../Forms/TextForm";
import AutoCompleteForm from "../Forms/AutoCompleteForm";
import DateForm from "../Forms/DateForm";
import AxiosInstance from "../Axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Message from "../Forms/Message";

/**
 * CreateMember Component
 * Renders structured input fields, validates data constraints, and sends payload states to the database.
 * 
 * @component CreateMember
 * @returns {JSX.Element} Member onboarding registration panel view
 */
export default function CreateMember() {
  const navigate = useNavigate();
  const [churches, setChurches] = useState([]);
  const [message, setMessage] = useState("");

  /**
   * Fetches the listing of registered churches to populate the autocomplete lookup dropdown.
   */
  const GetChurches = () => {
    AxiosInstance.get('churches/').then((response) => {
      setChurches(response.data);
    });
  };

  /**
   * Clears out existing values inside the form state tracker.
   */
  const clearData = () => {
    formik.resetForm();
  };

  // Pull baseline branch references when component initialises onto the rendering stack
  useEffect(() => {
    GetChurches();
  }, []);

  /**
   * Yup Validation Schema
   * Defines type constraints and required field conditions for a valid user submission.
   */
  const validationSchema = yup.object({
    full_name: yup
              .string("Full name must be a string")
              .required('Full Name is required'),
    email: yup
              .string()
              .email('Enter a valid email')
              .required('Email is required'),
    phone_number: yup
              .string()
              .required('Phone number is required'),
    address: yup
              .string()
              .required('Address is required'),
    church_id: yup
              .number()
              .required('Church selection is required')
              .nullable(),
    joined_date: yup
              .date()
              .required('Joined date is required')
              .nullable(),
  });

  /**
   * Formik State Controller Architecture
   * Collects values, runs structural validations, and manages submission loops.
   */
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      address: "", 
      church_id: null,
      joined_date: null,
      status: true
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AxiosInstance.post('members/', values)
      .then((response) => {
        setMessage(
          <Message
            message={"You have successfully created a new member"}
            messageColor={"#1b5e20"} // System palette green feedback highlight
          />
        );
        clearData();
        // Clear success notification panel following brief user visibility window
        setTimeout(() => {
          setMessage("");
        }, 4000); 
      });
    } 
  });

  /**
   * Safely rolls back view state to main directory layout grid.
   */
  const handleCancel = () => {
    navigate("/members");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        bgcolor: "#fcfcf9",
        p: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          border: "1px solid #f0f0e8",
          position: "relative",
          bgcolor: "#ffffff",
        }}
      >
        {/* Absolute Floating Escape Action Node Button */}
        <IconButton
          onClick={handleCancel}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#666",
            "&:hover": { color: "#000", bgcolor: "rgba(0,0,0,0.04)" },
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#0e1b11", mb: 0.5 }}
          >
            Add New Member
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Enter the details for the new church member.
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          {message}
          
          {/* Personal Profile Component Blocks */}
          <TextForm 
            label="Full Name" 
            name="full_name" 
            value={formik.values.full_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
            helperText={formik.touched.full_name && formik.errors.full_name}
          />

         <TextForm 
            label="Email" 
            name="email" 
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
         />

          <TextForm 
            label="Phone Number" 
            name="phone_number" 
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
            helperText={formik.touched.phone_number && formik.errors.phone_number}
          />

           <TextForm 
            label="Address" 
            name="address" 
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />

          {/* Relational Church Branch Autocomplete Search Matcher */}
          <AutoCompleteForm
            id="member-church-select"
            options={churches}
            label="Select Church"
            name="church_id"
            value={formik.values.church_id}
            isOptionEqualToValue={(option, val) => option.id === val.id}
            onChange={(name, value) => formik.setFieldValue("church_id", value)}
            onBlur={() => formik.setFieldTouched("church_id", true)}
            error={formik.touched.church_id && Boolean(formik.errors.church_id)}
            helperText={formik.touched.church_id && formik.errors.church_id}
          />

          {/* Registration Window Timestamp Selector Component */}
          <DateForm 
            id="member-joined-date-picker"
            label="Date Joined"
            name="joined_date"
            value={formik.values.joined_date}
            onChange={(name, value) => formik.setFieldValue("joined_date", value)}
            onBlur={() => formik.setFieldTouched("joined_date", true)}
            error={formik.touched.joined_date && Boolean(formik.errors.joined_date)}
            helperText={formik.touched.joined_date && formik.errors.joined_date}
          />

          {/* Layout Submission Execution Footer Action Container */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "10px",
                textTransform: "none",
                borderColor: "#e0e0e0",
                color: "#333",
                fontWeight: 600,
                "&:hover": { borderColor: "#b5b5b5", bgcolor: "#f5f5f5" },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 3,
                py: 1,
                borderRadius: "10px",
                textTransform: "none",
                bgcolor: "#1b5e20",
                fontWeight: 600,
                "&:hover": { bgcolor: "#144517" },
              }}
            >
              Add Member
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
