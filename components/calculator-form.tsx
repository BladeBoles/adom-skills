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
import { User, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
      <Card className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <User className="h-4 w-4 text-green-600 dark:text-green-500" />
              <label className="text-sm font-medium">Race</label>
            </div>
            <Select value={selectedRace} onValueChange={updateRace}>
              <SelectTrigger className="cursor-pointer w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RACE_NAMES.map((race) => (
                  <SelectItem key={race} value={race} className="cursor-pointer">
                    {race}
                  </SelectItem>
                ))}
                <SelectItem value="No Race" className="cursor-pointer">No Race</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-500" />
              <label className="text-sm font-medium">Profession</label>
            </div>
            <Select value={selectedProfession} onValueChange={updateProfession}>
              <SelectTrigger className="cursor-pointer w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROFESSION_NAMES.map((profession) => (
                  <SelectItem key={profession} value={profession} className="cursor-pointer">
                    {profession}
                  </SelectItem>
                ))}
                <SelectItem value="No Profession" className="cursor-pointer">No Profession</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Separator />

      {/* Skills List */}
      <SkillList skills={skills} />

      {/* Transfer Button */}
      <Button
        onClick={transferToPicker}
        variant="secondary"
        className="w-full cursor-pointer"
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
