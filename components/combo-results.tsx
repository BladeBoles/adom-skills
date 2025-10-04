'use client';

import { useState } from 'react';
import { Combo } from '@/lib/data/types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ComboResultsProps {
  combos: Combo[];
  groupBy: 'race' | 'profession';
}

export function ComboResults({ combos, groupBy }: ComboResultsProps) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  if (combos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-sm">No combinations found</p>
        <p className="text-xs mt-1">Try selecting different skills</p>
      </div>
    );
  }

  // Group combos
  const grouped = new Map<string, Combo[]>();
  combos.forEach((combo) => {
    const key = groupBy === 'race' ? combo.race : combo.profession;
    const existing = grouped.get(key) || [];
    grouped.set(key, [...existing, combo]);
  });

  const sortedGroups = Array.from(grouped.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (openGroups.size === sortedGroups.length) {
      setOpenGroups(new Set());
    } else {
      setOpenGroups(new Set(sortedGroups.map(([key]) => key)));
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {combos.length} combination{combos.length !== 1 ? 's' : ''} found
        </p>
        <Button
          onClick={toggleAll}
          variant="ghost"
          size="sm"
          className="text-xs cursor-pointer"
        >
          {openGroups.size === sortedGroups.length ? 'Collapse All' : 'Expand All'}
        </Button>
      </div>

      {/* Grouped Results */}
      <div className="space-y-2">
        {sortedGroups.map(([groupKey, groupCombos]) => (
          <Collapsible
            key={groupKey}
            open={openGroups.has(groupKey)}
            onOpenChange={() => toggleGroup(groupKey)}
          >
            <CollapsibleTrigger className="w-full cursor-pointer">
              <div className="flex items-center justify-between w-full px-4 py-3 rounded-md bg-muted hover:bg-muted/80 transition-colors">
                <div className="flex items-center gap-2">
                  {openGroups.has(groupKey) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span className="font-medium">{groupKey}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {groupCombos.length}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-1 pl-6">
                {groupCombos.map((combo, idx) => (
                  <Link
                    key={idx}
                    href={`/calculator?race=${encodeURIComponent(combo.race)}&profession=${encodeURIComponent(combo.profession)}`}
                    className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted/50 transition-colors group text-sm"
                  >
                    <span>
                      {groupBy === 'race' ? combo.profession : combo.race}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
