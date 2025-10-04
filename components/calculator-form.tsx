'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { RACE_NAMES } from '@/lib/data/races';
import { PROFESSION_NAMES } from '@/lib/data/professions';
import { calculateStartingSkills } from '@/lib/utils/skill-calculator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SkillList } from '@/components/skill-list';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function CalculatorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedRace = searchParams.get('race') || 'Dark Elf';
  const selectedProfession = searchParams.get('profession') || 'Archer';

  const skills = calculateStartingSkills(selectedRace, selectedProfession);

  const updateRace = (race: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('race', race);
    router.push(`/calculator?${params.toString()}`);
  };

  const updateProfession = (profession: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('profession', profession);
    router.push(`/calculator?${params.toString()}`);
  };

  const transferToPicker = () => {
    const skillNames = skills.map(s => s.name);
    const params = new URLSearchParams();
    skillNames.forEach(name => params.append('skills', name));
    router.push(`/picker?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Race</label>
          <Select value={selectedRace} onValueChange={updateRace}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RACE_NAMES.map((race) => (
                <SelectItem key={race} value={race}>
                  {race}
                </SelectItem>
              ))}
              <SelectItem value="No Race">No Race</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Profession</label>
          <Select value={selectedProfession} onValueChange={updateProfession}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROFESSION_NAMES.map((profession) => (
                <SelectItem key={profession} value={profession}>
                  {profession}
                </SelectItem>
              ))}
              <SelectItem value="No Profession">No Profession</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Skills List */}
      <SkillList skills={skills} />

      {/* Transfer Button */}
      <Button
        onClick={transferToPicker}
        variant="secondary"
        className="w-full"
      >
        Use these skills in Picker →
      </Button>

      {/* Notes */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p>* Bards start with random skills</p>
        <p>** Potion Merchants receive Alchemy</p>
        <p>*** Characters with Learning &gt; 9 get Literacy</p>
        <Separator className="my-2" />
        <p className="text-xs">
          Climbing, First Aid, Haggling, and Listening are available to all characters
        </p>
      </div>
    </div>
  );
}
