import { useContext } from 'react';
import { MenuContext } from './ctx';

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu compound components cannot be rendered outside the Menu component');
  }
  return context;
};
