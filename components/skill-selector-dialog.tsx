'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getAllSkillNames } from '@/lib/utils/combo-finder';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SkillSelectorDialogProps {
  selectedSkills: string[];
  onSkillAdd: (skill: string) => void;
}

export function SkillSelectorDialog({ selectedSkills, onSkillAdd }: SkillSelectorDialogProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const allSkills = getAllSkillNames();
  const availableSkills = allSkills.filter(
    (skill) => !selectedSkills.includes(skill)
  );

  const filteredSkills = availableSkills.filter((skill) =>
    skill.toLowerCase().includes(search.toLowerCase())
  );

  const handleSkillClick = (skill: string) => {
    onSkillAdd(skill);
    setOpen(false);
    setSearch('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select a Skill</DialogTitle>
          <DialogDescription>
            Choose a skill to add to your search criteria
          </DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Skills List */}
        <div className="max-h-[400px] overflow-y-auto">
          <div className="grid gap-2">
            {filteredSkills.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                {search ? 'No skills found' : 'All skills selected'}
              </p>
            ) : (
              filteredSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillClick(skill)}
                  className="text-left px-4 py-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  {skill}
                </button>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
