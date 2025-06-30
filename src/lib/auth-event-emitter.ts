// Simple event emitter for logout events in React (web)
type Listener = () => void;
const listeners: Listener[] = [];

export const logOut = () => {
  listeners.forEach((listener) => listener());
};

export const onLogOut = (listener: Listener) => {
  listeners.push(listener);

  return () => {
    const index = listeners.indexOf(listener);

    if (index > -1) listeners.splice(index, 1);
  };
};
