'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function NavHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-center gap-8">
          <Link
            href="/picker"
            className={cn(
              'text-lg font-medium transition-colors hover:text-primary',
              pathname === '/picker'
                ? 'text-foreground border-b-2 border-primary pb-1'
                : 'text-muted-foreground'
            )}
          >
            Picker
          </Link>
          <Link
            href="/calculator"
            className={cn(
              'text-lg font-medium transition-colors hover:text-primary',
              pathname === '/calculator'
                ? 'text-foreground border-b-2 border-primary pb-1'
                : 'text-muted-foreground'
            )}
          >
            Calculator
          </Link>
        </nav>
      </div>
    </header>
  );
}
