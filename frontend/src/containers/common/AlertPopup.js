import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle}   from '@mui/material';

const AlertPopup = (props) => {
  const { title, children, open, hidePopup } = props;
  return (
    <Dialog
      open={open}
      onClose={hidePopup}
      aria-labelledby="alert-dialog"
    >
      <DialogTitle id="alert-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={hidePopup}
        >
           Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AlertPopup;