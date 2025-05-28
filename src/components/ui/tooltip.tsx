'use client';

import * as React from 'react';

interface TooltipProps {
  children: React.ReactNode;
}

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  content?: React.ReactNode;
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined);

export const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children, asChild }) => {
  const context = React.useContext(TooltipContext);
  if (!context) throw new Error('TooltipTrigger must be used within a Tooltip');

  const Comp = asChild ? React.Fragment : 'span';
  
  return (
    <Comp
      onMouseEnter={() => context.setOpen(true)}
      onMouseLeave={() => context.setOpen(false)}
    >
      {children}
    </Comp>
  );
};

interface TooltipContentProps {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  hidden?: boolean;
}

export const TooltipContent: React.FC<TooltipContentProps> = ({
  children,
  side = 'top',
  align = 'center',
  hidden = false,
}) => {
  const context = React.useContext(TooltipContext);
  if (!context) throw new Error('TooltipContent must be used within a Tooltip');

  if (hidden || !context.open) return null;

  const positions = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)' },
  };

  const alignments = {
    start: { transform: 'translateY(0)' },
    center: {},
    end: { transform: 'translateY(-100%)' },
  };

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '14px',
        zIndex: 1000,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        ...positions[side],
        ...alignments[align],
      }}
    >
      {children}
    </div>
  );
};

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <>{children}</>;
};
