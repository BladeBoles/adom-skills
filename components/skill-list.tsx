import { StartingSkill } from '@/lib/data/types';
import { SkillBadge } from '@/components/skill-badge';
import { User, Shield } from 'lucide-react';

interface SkillListProps {
  skills: StartingSkill[];
}

export function SkillList({ skills }: SkillListProps) {
  return (
    <div className="space-y-3">
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
