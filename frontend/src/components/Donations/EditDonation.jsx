/**
 * @file EditDonation.jsx
 * @description Modification panel interface for existing contribution records.
 * Synchronizes unique ID url parameters, pulls background ledger states, and updates metrics safely.
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
 * EditDonation Component
 * Reinitializes financial input variables dynamically following backend payload sync routines.
 * 
 * @component EditDonation
 * @returns {JSX.Element} Donation transaction entry editing layout view
 */
export default function EditDonation() {
  const MyParameter = useParams();
  const donationId = MyParameter.id; // Target transaction row primary key
  const navigate = useNavigate();
  
  const [members, setMembers] = useState([]);
  
  // Property definitions to track financial transaction schemas rather than church branch fields
  const [donation, setDonation] = useState({
    member: null,
    activity: "",
    amount: "",
    donation_date: null
  });
  const [message, setMessage] = useState("");

  /**
   * Dispatches dual network queries concurrently to load transaction contexts and donor choice indexes.
   */
  const GetData = () => {
    AxiosInstance.get(`donations/${donationId}/`).then((response) => {
      setDonation(response.data);
    });

    AxiosInstance.get(`members/`).then((response) => {
      setMembers(response.data);
    });
  };

  // Synchronize component data layer context fields immediately upon initialization mount rules
  useEffect(() => {
    GetData();
  }, []);

  /**
   * Transaction Validation Form Criteria Mapping
   */
  const validationSchema = yup.object({
    member: yup
              .number()
              .required('Member selection is required')
              .nullable(),
    amount: yup
              .number()
              .typeError('Amount must be a valid number')
              .positive('Amount must be greater than zero')
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
   * Formik State Infrastructure Engine
   * Utilizes `enableReinitialize` to hydrate existing database logs straight into target field states.
   */
  const formik = useFormik({
    initialValues: {
      member: donation.member || null,
      activity: donation.activity || "",
      amount: donation.amount || "",
      donation_date: donation.donation_date || null, 
    },
    enableReinitialize: true, // Forces form inputs to update once asynchronous network payload finishes downloading
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AxiosInstance.put(`donations/${donationId}/`, values)
      .then((response) => {
        setMessage(
          <Message
            message={"You have successfully updated the donation"}
            messageColor={"#1b5e20"} // System green status alert accent banner fill
          />
        );
        // Returns the administrator safely back to the collection directory ledger view following brief wait threshold
        setTimeout(() => {
          navigate("/donations");
        }, 3000); 
      });
    } 
  });

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
        {/* Floating Escape Close Node Trigger Button */}
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
            Edit Donation Record
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Modify financial transaction ledger properties below.
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          {message}
          
            {/* Relational Active Donor Profile Dropdown Selection Search Box */}
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

            {/* Target Ministry/Activity Field Allocation Input */}
            <TextForm 
                label="Activity" 
                name="activity" 
                value={formik.values.activity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.activity && Boolean(formik.errors.activity)}
                helperText={formik.touched.activity && formik.errors.activity}
            />

            {/* Financial Decimal Currency Base Value Controller Input */}
            <TextForm 
                label="Amount" 
                name="amount" 
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
            />

            {/* Transaction Date Picker Input Component Module */}
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

          {/* Action Row Buttons Footer Section Grid */}
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
