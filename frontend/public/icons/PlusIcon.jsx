import React from "react";

export const PlusIcon = ({ size, height, width, ...props }) => {
  // avoid passing non-DOM attributes to svg
  const { isSelected, isIndeterminate, disableAnimation, ...otherProps } = props;

  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        d="M6 12H18"
        stroke="currentColor"
        strokeWidth="3" // Cambiado de stroke-width a strokeWidth
        strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        strokeLinejoin="round" // Cambiado de stroke-linejoin a strokeLinejoin
      />
      <path
        d="M12 18V6"
        stroke="currentColor"
        strokeWidth="3" // Cambiado de stroke-width a strokeWidth
        strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        strokeLinejoin="round" // Cambiado de stroke-linejoin a strokeLinejoin
      />
    </svg>
  );
};
