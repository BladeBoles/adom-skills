import { StartingSkill } from '@/lib/data/types';
import { getSkillSourceColor } from '@/lib/utils/skill-calculator';
import { User, Shield, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface SkillBadgeProps {
  skill: StartingSkill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  const colors = getSkillSourceColor(skill.source);
  const wikiUrl = `https://ancardia.fandom.com/wiki/${skill.name.replace(/ /g, '_')}`;

  return (
    <Link
      href={wikiUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{skill.name}</span>
        <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
      </div>
      <div className="flex items-center gap-2">
        <User className={`h-4 w-4 ${colors.race}`} />
        <Shield className={`h-4 w-4 ${colors.profession}`} />
      </div>
    </Link>
  );
}
