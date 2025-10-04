'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Search } from 'lucide-react';

export function NavHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
              @
            </span>
            <h1 className="text-lg font-bold">ADOM Skills</h1>
          </div>

          {/* Navigation */}
          <nav className="inline-flex rounded-lg border bg-muted p-1">
            <Link
              href="/calculator"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                pathname === '/calculator'
                  ? 'bg-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Calculator className="h-4 w-4" />
              Calculator
            </Link>
            <Link
              href="/picker"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                pathname === '/picker'
                  ? 'bg-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Search className="h-4 w-4" />
              Picker
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
