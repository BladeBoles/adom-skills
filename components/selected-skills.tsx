import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SelectedSkillsProps {
  skills: string[];
  onRemove: (skill: string) => void;
}

export function SelectedSkills({ skills, onRemove }: SelectedSkillsProps) {
  if (skills.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No skills selected</p>
        <p className="text-xs mt-1">Click &quot;Add Skill&quot; to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge
          key={skill}
          variant="secondary"
          className="pl-3 pr-1 py-1.5 text-sm gap-1"
        >
          {skill}
          <button
            onClick={() => onRemove(skill)}
            className="ml-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
