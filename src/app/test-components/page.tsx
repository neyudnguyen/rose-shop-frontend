'use client';

import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export default function TestComponents() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetSide, setSheetSide] = useState<'left' | 'right' | 'top' | 'bottom'>('right');

  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Sheet Component Test</h2>
        <div className="space-x-4">
          {(['left', 'right', 'top', 'bottom'] as const).map((side) => (
            <Button
              key={side}
              onClick={() => {
                setSheetSide(side);
                setSheetOpen(true);
              }}
            >
              Open {side} sheet
            </Button>
          ))}
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen} side={sheetSide}>
          <SheetContent side={sheetSide}>
            <h3 className="text-lg font-semibold mb-4">Sheet Content</h3>
            <p>This is a test sheet that opens from the {sheetSide}.</p>
            <p className="mt-4">Click outside to close.</p>
          </SheetContent>
        </Sheet>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Skeleton Component Test</h2>
        <div className="space-y-4">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Tooltip Component Test</h2>
        <div className="space-x-4">
          {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button>Hover me ({side})</Button>
              </TooltipTrigger>
              <TooltipContent side={side}>
                This tooltip appears on the {side}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>
    </div>
  );
}
