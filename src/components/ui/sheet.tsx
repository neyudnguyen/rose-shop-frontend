'use client';

import * as React from 'react';

interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
}

export const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ open, onOpenChange, children, side = 'right', ...props }, ref) => {
    // Handle close when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (open && onOpenChange && !(event.target as Element).closest('[data-sheet]')) {
          onOpenChange(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onOpenChange]);

    // Simple placeholder implementation
    return (
      <div
        ref={ref}
        data-sheet
        {...props}
        style={{
          display: open ? 'block' : 'none',
          position: 'fixed',
          ...(side === 'left' && { left: 0 }),
          ...(side === 'right' && { right: 0 }),
          ...(side === 'top' && { top: 0, width: '100%', height: '300px' }),
          ...(side === 'bottom' && { bottom: 0, width: '100%', height: '300px' }),
          ...((side === 'left' || side === 'right') && {
            top: 0,
            bottom: 0,
            width: '300px',
          }),
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          zIndex: 1000,
          overflowY: 'auto',
        }}
      >
        {children}
      </div>
    );
  }
);

Sheet.displayName = 'Sheet';

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ children, side = 'right', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        {...props}
        style={{
          height: '100%',
          overflowY: 'auto',
          padding: '1rem',
          ...(side === 'top' || side === 'bottom' ? { width: '100%' } : {}),
        }}
      >
        {children}
      </div>
    );
  }
);

SheetContent.displayName = 'SheetContent';
