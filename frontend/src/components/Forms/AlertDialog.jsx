/**
 * @file AlertDialog.jsx
 * @description Reusable generic modal alert dialog overlay layout component.
 * Intercepts user operations during critical transitions (such as record deletion loops) to verify confirmation before execution.
 */

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

/**
 * AlertDialog Modal Overlay Component
 * Manages modal visibility states and handles clean cancellation and confirmation callback workflows.
 * 
 * @component AlertDialog
 * @param {Object} props - Component properties
 * @param {boolean} props.open - State control visibility flag dictating whether the overlay layer renders on screen
 * @param {Function} props.handleClose - Close navigation window trigger event callback to clear modal states
 * @param {React.ReactNode} [props.title="Confirm Action"] - Optional primary bold header descriptive overlay title text
 * @param {React.ReactNode} props.message - Descriptive body advisory string outlining transactional finality warnings
 * @param {Function} props.onConfirm - Action resolution callback pipeline fired when user selects confirmation buttons
 * @param {string} [props.confirmText="Confirm"] - Text display copy label applied onto action validation buttons
 * @param {string} [props.cancelText="Cancel"] - Text display copy label applied onto fallback baseline cancel buttons
 * @returns {JSX.Element} Accessibility-compliant transactional warning modal dialog
 */
export default function AlertDialog({ 
  open, 
  handleClose, 
  title = "Confirm Action", 
  message, 
  onConfirm, 
  confirmText = "Confirm", 
  cancelText = "Cancel" 
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      role="alertdialog"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ pb: 2, px: 3 }}>
        <Button onClick={handleClose} color="inherit" sx={{ textTransform: 'none' }}>
          {cancelText}
        </Button>
        <Button 
          onClick={() => {
            onConfirm();    // Fire backend persistence mutation pipelines
            handleClose();  // Unmount overlay canvas panels seamlessly
          }} 
          color="error" // Relegates attention highlights to alert styling guidelines
          variant="contained" 
          autoFocus // Places immediate keyboard tracking focus on structural confirmation vectors
          sx={{ textTransform: 'none', bgcolor: '#d32f2f' }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
