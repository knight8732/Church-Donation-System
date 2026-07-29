/**
 * @file EditChurch.jsx
 * @description Profile modification dashboard interface for registered church branches.
 * Resolves targeted branch records via primary URL keys, handles variable reinitialization, and updates parameters.
 */

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
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
import AxiosInstance from "../Axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Message from "../Forms/Message";

/**
 * EditChurch Component
 * Controls modification data operations, runs input schema checks, and targets remote endpoints.
 * 
 * @component EditChurch
 * @returns {JSX.Element} Church branch parameters modification view card panel
 */
export default function EditChurch() {
  const MyParameter = useParams();
  const churchId = MyParameter.id; // Unique database branch record look-up key identifier
  const navigate = useNavigate();
  const [churches, setChurches] = useState([]);
  const [church, setchurch] = useState({
    name: "",
    pastor: "",
    phone_number: "",
    address: "", 
    status: true
  });
  const [message, setMessage] = useState("");

  /**
   * Pulls existing dataset profiles and alternative selection listings from background servers concurrently.
   */
  const GetData = () => {
    AxiosInstance.get(`churches/${churchId}/`).then((response) => {
      setchurch(response.data);
    });

    AxiosInstance.get(`churches/`).then((response) => {
      setChurches(response.data);
    });
  };

  // Synchronize dynamic input datasets concurrently upon standard component lifecycle initialization mount
  useEffect(() => {
    GetData();
  }, []);

  /**
   * Church Profile Entry Validation Fields Configuration Schema
   */
  const validationSchema = yup.object({
    name: yup
              .string("Church name must be a string")
              .required('Church Name is required'),
    pastor: yup
              .string()
              .required('Pastor is required'),
    phone_number: yup
              .string()
              .required('Phone number is required'),
    address: yup
              .string()
              .required('Address is required'),
    status: yup
              .boolean()
              .required('Status is required')
              .nullable(),  
  });

  /**
   * Formik Validation Architecture Controller
   * Leverages `enableReinitialize: true` to redraw field value states when async properties are filled.
   */
  const formik = useFormik({
    initialValues: {
      name: church.name || "",
      pastor: church.pastor || "",
      phone_number: church.phone_number || "",
      address: church.address || "", 
      status: church.status !== undefined ? church.status : true
    },
    enableReinitialize: true, // Auto-hydrates parameters seamlessly following backend dataset fulfillment cycles
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AxiosInstance.put(`churches/${churchId}/`, values)
      .then((response) => {
        setMessage(
          <Message
            message={"You have successfully updated the church"}
            messageColor={"#1b5e20"} // Corporate theme color status notification accent fill
          />
        );
        // Direct absolute routing redirection back onto directory grids following user display window
        setTimeout(() => {
          navigate("/churches");
        }, 3000); 
      });
    } 
  });

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
            Edit Church Details
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Modify branch operational configurations and profile details below.
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          {message}
          
          {/* Descriptive Profile Information Input Form Component Modules */}
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

         {/* Selection Element Autocomplete State Mapping Identifier Component */}
         <AutoCompleteForm
            id="church-status-select"
            options={[
              { value: true, label: "Active" },
              { value: false, label: "Inactive" }
            ]}
            isOptionEqualToValue={(option, val) => option.value === val.value}
            label="Select Status"
            name="status"
            value={formik.values.status}
            onChange={(name, value) => {
              formik.setFieldValue("status", value ? value.value : null);
            }}
            onBlur={() => formik.setFieldTouched("status", true)}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          />

          {/* Action Grid Layout Executions Controls Elements Area Footer */}
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
              Save Changes
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
