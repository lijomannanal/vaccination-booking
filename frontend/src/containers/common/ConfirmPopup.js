import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle}   from '@mui/material';

const ConfirmPopup = (props) => {
  const { title, children, open, hidePopup, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={hidePopup}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={hidePopup}
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            hidePopup();
            onConfirm();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmPopup;