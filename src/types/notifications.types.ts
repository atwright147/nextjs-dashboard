import { AlertColor } from '@mui/material';
import { Uuid } from './uuid.type';

export interface Notification {
  id: Uuid;
  type: AlertColor;
  body: string;
}
