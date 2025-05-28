'use client';

import * as React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          minHeight: '1em',
          ...style,
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Add keyframes for pulse animation globally or in your CSS
// @keyframes pulse {
//   0% {
//     opacity: 1;
//   }
//   50% {
//     opacity: 0.4;
//   }
//   100% {
//     opacity: 1;
//   }
// }
