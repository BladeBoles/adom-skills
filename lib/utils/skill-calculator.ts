import { SKILLS, FREE_SKILLS } from '../data/skills';
import { StartingSkill, SkillSource } from '../data/types';

/**
 * Calculate starting skills for a given race and profession combination
 */
export function calculateStartingSkills(
  race: string | null,
  profession: string | null
): StartingSkill[] {
  const skills: StartingSkill[] = [];

  // Add free skills first
  FREE_SKILLS.forEach((skillName) => {
    skills.push({ name: skillName, source: 'free' });
  });

  // Calculate skills from race and profession
  SKILLS.forEach((skill) => {
    const hasRaceSkill = race && skill.races.includes(race);
    const hasProfessionSkill = profession && skill.professions.includes(profession);

    if (hasRaceSkill && hasProfessionSkill) {
      // Double skill - from both race and profession
      skills.push({ name: skill.name, source: 'both' });
    } else if (hasRaceSkill) {
      // Race skill only
      skills.push({ name: skill.name, source: 'race' });
    } else if (hasProfessionSkill) {
      // Profession skill only
      skills.push({ name: skill.name, source: 'profession' });
    }
  });

  // Sort alphabetically by name
  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get skill source icon color classes
 */
export function getSkillSourceColor(source: SkillSource): {
  race: string;
  profession: string;
} {
  return {
    race: source === 'race' || source === 'both' ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground/30',
    profession: source === 'profession' || source === 'both' ? 'text-blue-600 dark:text-blue-500' : 'text-muted-foreground/30',
  };
}

/**
 * Check if a skill name is a free skill
 */
export function isFreeSkill(skillName: string): boolean {
  return (FREE_SKILLS as readonly string[]).includes(skillName);
}
