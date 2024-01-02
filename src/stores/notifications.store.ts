import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { Notification } from '../types/notifications.types';

export interface State {
  notifications: Notification[];
  init: () => void;
  add: (_notification: Omit<Notification, 'id'>) => void;
  remove: (notification: Notification) => void;
  empty: () => void;
}

export const useNotificationsStore = create<State>((set, get) => ({
  notifications: [],
  init: () => set({ notifications: [] }),
  add: (_notification) => {
    const notification: Notification = {
      id: uuidv4(),
      ..._notification,
    };
    set({ notifications: [...get().notifications, notification] });
  },
  remove: (notification) => set({ notifications: get().notifications.filter((n) => n.id !== notification.id) }),
  empty: () => set({ notifications: [] }),
}));
