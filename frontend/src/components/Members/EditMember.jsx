/**
 * @file EditMember.jsx
 * @description Profile modification dashboard interface for existing church members.
 * Fetches record targets by URL parameters, reinitializes form state safely, and handles updates.
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
import DateForm from "../Forms/DateForm";
import AxiosInstance from "../Axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Message from "../Forms/Message";

/**
 * EditMember Component
 * Loads record data states into a manageable form validation architecture.
 * 
 * @component EditMember
 * @returns {JSX.Element} Member modification card panel view
 */
export default function EditMember() {
  const MyParameter = useParams();
  const memberId = MyParameter.id; // Extracts unique primary key row parameter
  const navigate = useNavigate();
  
  const [churches, setChurches] = useState([]);
  const [member, setMember] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "", 
    church_id: null,
    joined_date: "",
    status: true
  });
  const [message, setMessage] = useState("");

  /**
   * Orchestrates parallel endpoints queries to pull baseline profile states and dropdown criteria together.
   */
  const GetData = () => {
    AxiosInstance.get(`members/${memberId}/`).then((response) => {
      setMember(response.data);
    });

    AxiosInstance.get(`churches/`).then((response) => {
      setChurches(response.data);
    });
  };

  // Trigger initial synchronization window during instantiation lifecycles
  useEffect(() => {
    GetData();
  }, []);

  /**
   * Validation Rules Definition
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
   * Formik Configuration Setup
   * Uses `enableReinitialize: true` to refresh inputs when async data finishes downloading.
   */
  const formik = useFormik({
    initialValues: {
      full_name: member.full_name || "",
      email: member.email || "",
      phone_number: member.phone_number || "",
      address: member.address || "", 
      church_id: member.church_id || null,
      joined_date: member.joined_date || null,
      status: member.status !== undefined ? member.status : true
    },
    enableReinitialize: true, // Forces re-evaluation loops when parent data state updates
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AxiosInstance.put(`members/${memberId}/`, values)
      .then((response) => {
        setMessage(
          <Message
            message={"You have successfully updated the member"}
            messageColor={"#1b5e20"}
          />
        );
        // Returns the user back to the primary directory directory layout following success responses
        setTimeout(() => {
          navigate("/members");
        }, 3000); 
      });
    } 
  });

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
            Edit Member Details
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Modify profile configuration data fields below.
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          {message}
          
          {/* Identity Fields Input Blocks */}
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

          {/* Relational Church Connection Mapping Component */}
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

          {/* Historic Registration Window Picker Component */}
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

          {/* Member Status Dropdown Picker Element */}
          <AutoCompleteForm
            id="member-status-select"
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

          {/* Footer Action Panel Options Layout */}
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
