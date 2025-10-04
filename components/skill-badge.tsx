import { StartingSkill } from '@/lib/data/types';
import { getSkillSourceColor } from '@/lib/utils/skill-calculator';
import { User, Shield } from 'lucide-react';

interface SkillBadgeProps {
  skill: StartingSkill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  const colors = getSkillSourceColor(skill.source);

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/50 hover:bg-muted transition-colors">
      <span className="text-sm font-medium">{skill.name}</span>
      <div className="flex items-center gap-2">
        <User className={`h-4 w-4 ${colors.race}`} />
        <Shield className={`h-4 w-4 ${colors.profession}`} />
      </div>
    </div>
  );
}
