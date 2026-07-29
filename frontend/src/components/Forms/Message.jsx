/**
 * @file Message.jsx
 * @description Reusable contextual alert banner element.
 * Renders uniform inline feedback strips (e.g., green success updates, red validation alarms) across dashboard forms.
 */

import { Box, Typography } from "@mui/material";

/**
 * Message Alert Component
 * Displays system status confirmations directly above active entry fields.
 * 
 * @component Message
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.message - Text copy string content or inner layout element node displayed to the user
 * @param {string} props.messageColor - Hexadecimal string or Material UI color token string applied to the banner backdrop fill
 * @returns {JSX.Element} Visual alert banner block container
 */
export default function Message({ message, messageColor }) {
    return (
        <Box 
            sx={{
                width: "100%",
                height: "30px",
                color: "white",
                backgroundColor: messageColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px",
                mb: 2, // Margins bottom offset to create uniform vertical gutters under messages
            }}
        >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {message}
            </Typography>
        </Box>
    );
}
