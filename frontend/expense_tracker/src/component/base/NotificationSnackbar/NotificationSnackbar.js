import {
    Snackbar,
    Alert
  } from "@mui/material";
  import { useState } from "react";
  import { useSelector } from "react-redux";
  
  function NotificationSnackbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [alertProps, setAlertProps] = useState({ alertId: null, severity: null, message: null });
  
    const sliceState = useSelector((state) => state.snackbarNotification);
    const SNACKBAR_DURATION = 6000;
    if (!!sliceState.alertId && sliceState.alertId !== alertProps.alertId) {
      if (!!sliceState.severity && !!sliceState.message) {
        setAlertProps({
          alertId: sliceState.alertId,
          severity: sliceState.severity,
          message: sliceState.message,
        });
        setIsOpen(true);
      }
    }
  
    return (
      <Snackbar
        open={isOpen}
        autoHideDuration={SNACKBAR_DURATION}
        onClose={() => { setIsOpen(false); }}
      >
        <Alert
          onClose={() => { setIsOpen(false); }}
          severity={alertProps.severity}
          sx={{ width: '100%' }}
        >
          {alertProps.message}
        </Alert>
      </Snackbar>
    )
  }
  
  export default NotificationSnackbar;