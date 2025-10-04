'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { findValidCombos } from '@/lib/utils/combo-finder';
import { SkillSelectorDialog } from '@/components/skill-selector-dialog';
import { SelectedSkills } from '@/components/selected-skills';
import { ComboResults } from '@/components/combo-results';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
      {/* Skill Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Selected Skills</h3>
          <SkillSelectorDialog
            selectedSkills={selectedSkills}
            onSkillAdd={addSkill}
          />
        </div>
        <SelectedSkills skills={selectedSkills} onRemove={removeSkill} />
      </div>

      <Separator />

      {/* Group By Toggle */}
      {selectedSkills.length > 0 && (
        <>
          <div className="space-y-3">
            <Label className="text-sm font-medium">Group by</Label>
            <RadioGroup
              value={groupBy}
              onValueChange={(value) => setGroupBy(value as 'race' | 'profession')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="race" id="race" />
                <Label htmlFor="race" className="font-normal cursor-pointer">
                  Race
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="profession" id="profession" />
                <Label htmlFor="profession" className="font-normal cursor-pointer">
                  Profession
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />
        </>
      )}

      {/* Results */}
      <ComboResults combos={validCombos} groupBy={groupBy} />
    </div>
  );
}
