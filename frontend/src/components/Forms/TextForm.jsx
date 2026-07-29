/**
 * @file TextForm.jsx
 * @description Reusable generic text input component.
 * Wraps the Material UI TextField component to standardize layout behavior and form states.
 */

import TextField from '@mui/material/TextField';

/**
 * TextForm Generic Input Component
 * Binds properties to form state tracking controllers (like Formik) to streamline view logic.
 * 
 * @component TextForm
 * @param {Object} props - Component properties
 * @param {string} props.label - Floating display label header text visible on the field canvas
 * @param {string|number} props.value - The active controlled string data bound inside the field
 * @param {string} props.name - Form object matching property lookup key identifier
 * @param {Function} props.onChange - Mutation state sync event handler callback function
 * @param {Function} props.onBlur - Focus termination evaluation listener function
 * @param {boolean} props.error - Evaluation boolean flag driving active validation error styling states
 * @param {React.ReactNode} props.helperText - Secondary dynamic validation or advisory error message text
 * @returns {JSX.Element} Configured Material UI TextField input controller
 */
export default function TextForm({ label, value, name, onChange, onBlur, error, helperText }) {
    return (
        <TextField 
            id="outlined-basic" 
            label={label}
            value={value}
            variant="outlined"
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
        />
    );
}
