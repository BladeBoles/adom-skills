'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { findValidCombos } from '@/lib/utils/combo-finder';
import { SkillSelectorDialog } from '@/components/skill-selector-dialog';
import { SelectedSkills } from '@/components/selected-skills';
import { ComboResults } from '@/components/combo-results';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

export function PickerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get selected skills from URL
  const selectedSkills = searchParams.getAll('skills');

  // Group by state
  const [groupBy, setGroupBy] = useState<'race' | 'profession'>('race');

  // Find valid combos
  const validCombos = selectedSkills.length > 0 ? findValidCombos(selectedSkills) : [];

  const addSkill = (skill: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.append('skills', skill);
    router.push(`/picker?${params.toString()}`);
  };

  const removeSkill = (skillToRemove: string) => {
    const params = new URLSearchParams();
    selectedSkills
      .filter((skill) => skill !== skillToRemove)
      .forEach((skill) => params.append('skills', skill));
    router.push(`/picker?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Skill Selector - Always visible */}
      <SkillSelectorDialog
        selectedSkills={selectedSkills}
        onSkillAdd={addSkill}
      />

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Selected Skills</h3>
            <SelectedSkills skills={selectedSkills} onRemove={removeSkill} />
          </div>
          <Separator />
        </>
      )}

      {/* Group By Toggle */}
      {selectedSkills.length > 0 && (
        <>
          <div className="space-y-3">
            <Label className="text-sm font-medium">Group by</Label>
            <div className="inline-flex rounded-lg border bg-muted p-1">
              <button
                onClick={() => setGroupBy('race')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                  groupBy === 'race'
                    ? 'bg-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Race
              </button>
              <button
                onClick={() => setGroupBy('profession')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                  groupBy === 'profession'
                    ? 'bg-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Profession
              </button>
            </div>
          </div>

          <Separator />
        </>
      )}

      {/* Results */}
      <ComboResults combos={validCombos} groupBy={groupBy} />
    </div>
  );
}
