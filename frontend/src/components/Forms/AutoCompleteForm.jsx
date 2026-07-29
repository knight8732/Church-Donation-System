/**
 * @file AutoCompleteForm.jsx
 * @description Reusable generic autocomplete dropdown selection component.
 * Wraps Material UI Autocomplete to unify object lookup patterns and translate complex data models into flat form state keys.
 */

import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

/**
 * AutoCompleteForm Input Component
 * Automatically flattens dynamic database entity objects into primitive scalar values (IDs or strings).
 * 
 * @component AutoCompleteForm
 * @param {Object} props - Component properties
 * @param {Object[]} props.options - Array of available dropdown option objects (e.g. Church, Member, Status states)
 * @param {string} props.label - Floating display label header visible on the pickers field canvas
 * @param {string} props.name - Form target field property lookup identifier key matching data structures
 * @param {Function} props.onChange - Mutation state sync event handler callback function
 * @param {Function} props.onBlur - Focus termination evaluation listener function
 * @param {any} props.value - The flat primitive tracking code identifier bound to the active selection (e.g. `id` or `value`)
 * @param {boolean} props.error - Evaluation boolean flag driving active validation error styling states
 * @param {React.ReactNode} props.helperText - Dynamic text feedback or alternative validation warning messages
 * @param {Function} props.isOptionEqualToValue - Callback evaluation rule used to resolve deep value selection equalities
 * @returns {JSX.Element} Configured Material UI Autocomplete lookup selection controller
 */
export default function AutoCompleteForm({ options, label, name, onChange, onBlur, value, error, helperText, isOptionEqualToValue }) {
  
  /**
   * Evaluates and retrieves the full complex object from the flat primitive tracking variable.
   * Scans across standard database primary keys (`id`) and custom status properties (`value`).
   */
  const selectedOption = options.find((opt) => {
    const optId = opt && typeof opt === 'object' ? (opt.id !== undefined ? opt.id : opt.value) : null;
    return optId === value;
  }) || null;

  return (
    <Autocomplete
      disablePortal
      options={options}
      // Dynamically resolves string labels from inconsistent backend API dictionary mappings
      getOptionLabel={(opt) => opt.full_name || opt.name || opt.label || ''}
      isOptionEqualToValue={isOptionEqualToValue}
      value={selectedOption}
      onChange={(event, currentObject) => {
        if (onChange) {
          // Flatten the target choice object downstream back into standard form payloads before submission
          const targetValue = currentObject 
            ? (currentObject.id !== undefined ? currentObject.id : currentObject.value) 
            : null;
          onChange(name, targetValue);
        }
      }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={label} 
          variant="outlined" 
          name={name}
          onBlur={onBlur}
          error={!!error}
          helperText={helperText}
          sx={{ marginBottom: "24px" }}
        />
      )}
    />
  );
}
