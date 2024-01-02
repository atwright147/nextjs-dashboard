import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, IconButton, Snackbar } from '@mui/material';
import { useNotificationsStore } from '../stores/notifications.store';
import { Notification } from '../types/notifications.types';
import { Uuid } from '../types/uuid.type';

export const Snackbars = (): JSX.Element => {
  const { init, add, remove, empty, notifications } = useNotificationsStore();

  const handleClose = (notification: Notification): void => {
    remove(notification);
  };

  return (
    <>
      {notifications.map((notification) => {
        return (
          <Snackbar key={notification.id} autoHideDuration={6000} onClose={() => handleClose(notification)} open={true}>
            <Alert
              severity={notification.type}
              sx={{ width: '100%' }}
              action={
                <>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={() => handleClose(notification)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
            >
              {notification.body}
            </Alert>
          </Snackbar>
        );
      })}
    </>
  );
};
