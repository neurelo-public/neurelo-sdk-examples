import React, { ForwardedRef, LegacyRef } from 'react';

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: LegacyRef<HTMLButtonElement> | ForwardedRef<HTMLButtonElement> | undefined;
}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  );
});

CloseButton.displayName = 'CloseButton';

export default CloseButton;
