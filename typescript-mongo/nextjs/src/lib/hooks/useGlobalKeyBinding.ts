import React from 'react';

type KeyListener = Record<string, () => void>;

type HookProps = {
  blockInputEl: boolean;
  cmd: boolean;
  preventDefault: boolean;
  keyBindings: KeyListener;
};

/**
 * #### Hook to bind global key listener
 * I made this hook to bind global key listener, so I can re-use it in my next project.
 * All props are self-explanatory and required.
 * @param boolean blockInputEl
 * @param boolean cmd
 * @param boolean preventDefault
 * @param KeyListener keyBindings
 * @returns {void}
 * @example
 * useGlobalKeyBinding({
 *  blockInputEl: true,
 *  cmd: true,
 *  preventDefault: true,
 *  keyBindings: {
 *    'ArrowUp': () => console.log('ArrowUp'),
 *    'ArrowDown': () => console.log('ArrowDown'),
 *  }
 * });
 */
export const useGlobalKeyBinding = (props: HookProps): void => {
  const { blockInputEl, cmd, keyBindings, preventDefault } = props;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Sanity check
      if (!e.key) return;
      if (cmd && !e.metaKey) return;
      if (blockInputEl && e.target instanceof HTMLInputElement) return;

      // Prevent default behavior (Override browser default behavior)
      if (preventDefault) e.preventDefault();

      const functionToCall = keyBindings?.[e.key];

      if (
        keyBindings !== undefined &&
        e.key !== undefined &&
        functionToCall !== undefined &&
        typeof functionToCall === 'function'
      ) {
        functionToCall();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [props, keyBindings, blockInputEl, cmd, preventDefault]);
};
