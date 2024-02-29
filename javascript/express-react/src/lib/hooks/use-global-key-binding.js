import React from "react";

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
export function useGlobalKeyBinding(props) {
  const { blockInputEl, cmd, keyBindings, preventDefault } = props;

  React.useEffect(() => {
    const handleKeyDown = (e) => {
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
        typeof functionToCall === "function"
      ) {
        functionToCall();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props, keyBindings, blockInputEl, cmd, preventDefault]);
}
