/**
 * @file DateForm.jsx
 * @description Reusable contextual date picker form component.
 * Integrates Material UI X-Pickers with Day.js to map calendar date events to ISO data models.
 */

import React, { useState } from 'react'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

/**
 * DateForm Input Component
 * Encapsulates date selection behaviors and exposes standardized string data to parent forms.
 * 
 * @component DateForm
 * @param {Object} props - Component properties
 * @param {string} props.label - Floating placeholder description header visible on the pickers field
 * @param {string|null} props.value - Standard ISO format date string ('YYYY-MM-DD') tracking state
 * @param {string} props.name - Form field lookup identifier target key
 * @param {Function} props.onChange - State sync mutation callback receiving arguments (name, formattedDateString)
 * @param {Function} props.onBlur - Focus termination event evaluation listener function
 * @param {boolean} props.error - Evaluation boolean flag driving active validation warning styles
 * @param {React.ReactNode} props.helperText - Dynamic text feedback or alternative calendar layout hints
 * @returns {JSX.Element} Localized Material UI DatePicker component setup block
 */
export default function DateForm({ label, value, name, onChange, onBlur, error, helperText }) {
  // Local state to track whether the calendar modal popover is open
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Wraps execution environments with unified timezone processing engines
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        label={label}
        // Converts inbound strings to a Dayjs wrapper; safely defaults to null to eliminate value lock crashes
        value={value ? dayjs(value) : null}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onChange={(newValue) => {
          if (onChange) {
            // Extract standard ISO serialization metrics; discards corrupt entries to prevent field parsing breaks
            const formattedDate = newValue && newValue.isValid() 
              ? newValue.format('YYYY-MM-DD') 
              : null;
            
            onChange(name, formattedDate);
          }
        }}
        slotProps={{
          textField: {
            variant: "outlined",
            name: name,
            onBlur: onBlur,
            error: !!error, // Forces a rigorous boolean evaluation representation
            helperText: error ? helperText : 'MM/DD/YYYY', // Dynamically replaces baseline layout format with warning logs
            // Triggers calendar opening when clicking anywhere inside the input boundary box
            onClick: () => setIsOpen(true), 
          }
        }}
        sx={{
          marginBottom: "24px",
          width: "100%",
          ".MuiPickersSectionList-section": {
            color: "green",
          },
          "& .MuiOutlinedInput-root": {
            cursor: "pointer",
            backgroundColor: "#f8f9f8",
            borderRadius: "12px",
            transition: "all 0.2s ease-in-out",
            "& input": { cursor: "pointer" },
            "& fieldset": {
              borderColor: "#e8ebe8",
            },
            "&:hover fieldset": {
              borderColor: "#cbd2cb",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#447a48",
              borderWidth: "2px",
            },
            // Overwrite default accents during active validation alerts to highlight inputs in dark red
            "&.Mui-error fieldset": {
              borderColor: "#d32f2f",
            }
          },
          "& .MuiFormHelperText-root.Mui-error": {
            color: "#d32f2f"
          }
        }}
      />
    </LocalizationProvider>
  );
}
