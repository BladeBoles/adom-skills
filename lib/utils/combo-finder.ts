import { SKILLS, FREE_SKILLS } from '../data/skills';
import { RACE_NAMES } from '../data/races';
import { PROFESSION_NAMES } from '../data/professions';
import { Combo } from '../data/types';

/**
 * Generate all possible race/profession combinations with their skills
 * This is done on-the-fly instead of using a pre-computed JSON file
 */
export function generateAllCombos(): Combo[] {
  const combos: Combo[] = [];

  // Generate combos for each race/profession pair
  RACE_NAMES.forEach((race) => {
    PROFESSION_NAMES.forEach((profession) => {
      const combo: Combo = {
        race,
        profession,
        skills: [],
        doubleSkills: [],
      };

      // Calculate skills for this combo
      SKILLS.forEach((skill) => {
        const hasRaceSkill = skill.races.includes(race);
        const hasProfessionSkill = skill.professions.includes(profession);

        if (hasRaceSkill && hasProfessionSkill) {
          // Skill from both sources
          combo.doubleSkills.push(skill.name);
        } else if (hasRaceSkill || hasProfessionSkill) {
          // Skill from one source
          combo.skills.push(skill.name);
        }
      });

      combos.push(combo);
    });
  });

  return combos;
}

/**
 * Filter combos that have all the wanted skills
 */
export function findValidCombos(wantedSkills: string[]): Combo[] {
  const allCombos = generateAllCombos();

  return allCombos.filter((combo) => {
    return wantedSkills.every((skill) => {
      // Check if the skill is in the combo's skills or double skills
      // or if it's a free skill (available to all)
      return (
        combo.skills.includes(skill) ||
        combo.doubleSkills.includes(skill) ||
        isFreeSkillInCombo(skill)
      );
    });
  });
}

/**
 * Group combos by race
 */
export function groupCombosByRace(combos: Combo[]): Map<string, Combo[]> {
  const grouped = new Map<string, Combo[]>();

  combos.forEach((combo) => {
    const existing = grouped.get(combo.race) || [];
    grouped.set(combo.race, [...existing, combo]);
  });

  return grouped;
}

/**
 * Group combos by profession
 */
export function groupCombosByProfession(combos: Combo[]): Map<string, Combo[]> {
  const grouped = new Map<string, Combo[]>();

  combos.forEach((combo) => {
    const existing = grouped.get(combo.profession) || [];
    grouped.set(combo.profession, [...existing, combo]);
  });

  return grouped;
}

/**
 * Get all unique skill names from the skills list
 */
export function getAllSkillNames(): string[] {
  return SKILLS.map((skill) => skill.name).sort();
}

/**
 * Check if a skill is a free skill
 */
export function isFreeSkillInCombo(skillName: string): boolean {
  return (FREE_SKILLS as readonly string[]).includes(skillName);
}
