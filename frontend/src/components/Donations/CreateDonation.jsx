/**
 * @file CreateDonation.jsx
 * @description Administrative form interface for registering new financial contributions.
 * Implements strict numeric currency validation rules, handles relational model selections, and logs allocations.
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
 * CreateDonation Component
 * Processes transaction data entries, verifies mathematical parameters, and commits payloads to the database.
 * 
 * @component CreateDonation
 * @returns {JSX.Element} Donation tracking registration form panel
 */
export default function CreateDonation() {
  const navigate = useNavigate();
  const [churches, setChurches] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");

  /**
   * Orchestrates parallel async lifecycle calls to resolve lookup datasets for dependencies.
   */
  const GetData = () => {
    AxiosInstance.get('churches/').then((response) => {
      setChurches(response.data);
    });
    AxiosInstance.get('members/').then((response) => {
      setMembers(response.data);
    });
  };

  /**
   * Resets form validation state and flattens tracking criteria back to initial baselines.
   */
  const clearData = () => {
    formik.resetForm();
  }

  // Pre-load lookup resources concurrently during initial component mount lifecycles
  useEffect(() => {
    GetData();
  }, []);

  /**
   * Financial Transaction Validation Schema
   * Enforces rigorous data entry criteria to safeguard financial accounting datasets.
   */
  const validationSchema = yup.object({
    member: yup
              .number()
              .required('Member selection is required')
              .nullable(),
    amount: yup
              .number()
              .typeError('Amount must be a valid number')
              .positive('Amount must be greater than zero') // Rejects negative allocations or empty inputs
              .required('Amount is required'),
    activity: yup
              .string()
              .required('Activity is required'),
    donation_date: yup
              .date()
              .required('Date is required')
              .nullable(),
  });

  /**
   * Formik State Orchestrator
   * Manages fields state data models and captures asynchronous submit payloads.
   */
  const formik = useFormik({
    initialValues: {
      member: null,
      amount: "",
      activity: "",
      donation_date: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AxiosInstance.post('donations/', values)
      .then((response) => {
        setMessage(
          <Message
            message={"You have successfully created a new donation"}
            messageColor={"#1b5e20"} // System palette green compliance highlight banner
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
   * Routes navigation paths back to the central donation ledger display grid.
   */
  const handleCancel = () => {
    navigate("/donations");
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
        {/* Absolute Floating Escape Action Close Button */}
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
            Add New Donation
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Enter the details for the new church donation record.
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          {message}

          {/* Relational Donor Record Search Matcher Drops Down Selection List */}
          <AutoCompleteForm
            id="donation-member-select"
            options={members}
            label="Select Member"
            name="member"
            value={formik.values.member}
            isOptionEqualToValue={(option, val) => option.id === val.id}
            onChange={(name, value) => formik.setFieldValue("member", value)}
            onBlur={() => formik.setFieldTouched("member", true)}
            error={formik.touched.member && Boolean(formik.errors.member)}
            helperText={formik.touched.member && formik.errors.member}
          />

          {/* Ministry Fund Allocation Destination Segment */}
         <TextForm 
            label="Activity" 
            name="activity" 
            value={formik.values.activity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.activity && Boolean(formik.errors.activity)}
            helperText={formik.touched.activity && formik.errors.activity}
         />

          {/* Monetary Flat Value Decimal Amount Controller */}
          <TextForm 
            label="Amount" 
            name="amount" 
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />

          {/* Transaction Effective Processing Window Date Selection Component */}
          <DateForm 
            id="donation-date-picker"
            label="Date"
            name="donation_date"
            value={formik.values.donation_date}
            onChange={(name, value) => formik.setFieldValue("donation_date", value)}
            onBlur={() => formik.setFieldTouched("donation_date", true)}
            error={formik.touched.donation_date && Boolean(formik.errors.donation_date)}
            helperText={formik.touched.donation_date && formik.errors.donation_date}
          />

          {/* Flexbox Action Execution Control Wrapper Footer Grid Container */}
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
              Add Donation
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
