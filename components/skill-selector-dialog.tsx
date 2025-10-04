'use client';

import { useState, useRef, useEffect } from 'react';
import { getAllSkillNames } from '@/lib/utils/combo-finder';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface SkillSelectorDialogProps {
  selectedSkills: string[];
  onSkillAdd: (skill: string) => void;
}

export function SkillSelectorDialog({ selectedSkills, onSkillAdd }: SkillSelectorDialogProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const allSkills = getAllSkillNames();
  const availableSkills = allSkills.filter(
    (skill) => !selectedSkills.includes(skill)
  );

  const filteredSkills = availableSkills.filter((skill) =>
    skill.toLowerCase().includes(search.toLowerCase())
  );

  const handleSkillClick = (skill: string) => {
    onSkillAdd(skill);
    setSearch('');
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Plus className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Add skills..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-9 pr-9"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-2 z-50 shadow-lg">
          <div className="max-h-[300px] overflow-y-auto">
            <div className="grid gap-1">
              {filteredSkills.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {search ? 'No skills found' : 'All skills selected'}
                </p>
              ) : (
                filteredSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillClick(skill)}
                    className="text-left px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm cursor-pointer"
                  >
                    {skill}
                  </button>
                ))
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
