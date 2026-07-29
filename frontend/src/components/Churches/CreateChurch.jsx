/**
 * @file CreateChurch.jsx
 * @description Administrative registration form for onboarding new church branches.
 * Leverages Formik and Yup validation rules to securely gather profile data before database creation.
 */

import React, { useState } from "react";
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
import AxiosInstance from "../Axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Message from "../Forms/Message";

/**
 * CreateChurch Component
 * Handles the input tracking state and layout structure for new congregation entities.
 * 
 * @component CreateChurch
 * @returns {JSX.Element} The church onboarding form panel view
 */
export default function CreateChurch() { 
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  /**
   * Clears out existing fields values from the active form state tracker.
   */
  const clearData = () => {
    formik.resetForm();
  };

  /**
   * Church Record Field Constraints Validation Schema
   */
  const validationSchema = yup.object({
    name: yup
              .string("Church name must be a string")
              .required('Church Name is required'),
    phone_number: yup
              .string()
              .required('Phone number is required'),
    address: yup
              .string()
              .required('Address is required'),
    pastor: yup
              .string()
              .required('Pastor is required')
  });

  /**
   * Formik State Orchestrator Interface Configuration
   */
  const formik = useFormik({
    initialValues: {
      name: "",
      phone_number: "",
      address: "", 
      pastor: "",
      status: true
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AxiosInstance.post('churches/', values)
      .then((response) => {
        setMessage(
          <Message
            message={"You have successfully created a new church"}
            messageColor={"#1b5e20"} // Corporate liturgical palette validation feedback green fill
          />
        );
        clearData();
        // Unmount status alerts following brief interaction visibility thresholds
        setTimeout(() => {
          setMessage("");
        }, 4000); 
      });
    } 
  });

  /**
   * Returns routing navigation context back onto primary branch list tables directory.
   */
  const handleCancel = () => {
    navigate("/churches");
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
        {/* Floating Escape Dismiss Action Close Node Icon Button */}
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
            Add New Church
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Enter the details for the new church entity branch profile.
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          {message}
          
          {/* Identity Parameters Input Field Forms Component Block Elements Modules */}
          <TextForm 
            label="Church Name" 
            name="name" 
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

         <TextForm 
            label="Pastor" 
            name="pastor" 
            value={formik.values.pastor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pastor && Boolean(formik.errors.pastor)}
            helperText={formik.touched.pastor && formik.errors.pastor}
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

          {/* Clean Flex Layout Control Actions Row Panel Block Component Wrapper Footer */}
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
              Add Church
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
