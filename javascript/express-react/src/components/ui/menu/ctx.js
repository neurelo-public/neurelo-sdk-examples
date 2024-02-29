import { createContext } from 'react';

export const MenuContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
});

export const MenuProvider = MenuContext.Provider;
export const MenuConsumer = MenuContext.Consumer;
