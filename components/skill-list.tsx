import { StartingSkill } from '@/lib/data/types';
import { SkillBadge } from '@/components/skill-badge';
import { User, Shield } from 'lucide-react';

interface SkillListProps {
  skills: StartingSkill[];
}

export function SkillList({ skills }: SkillListProps) {
  return (
    <div className="space-y-3">
      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground pb-2">
        <div className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5 text-green-600 dark:text-green-500" />
          <span>Race</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500" />
          <span>Profession</span>
        </div>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1 gap-2">
        {skills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground text-center pt-2">
        {skills.length} {skills.length === 1 ? 'skill' : 'skills'} total
      </p>
    </div>
  );
}
