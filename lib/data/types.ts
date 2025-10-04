export type SkillSource = 'race' | 'profession' | 'both' | 'free';

export interface Skill {
  name: string;
  description: string;
  races: string[];
  professions: string[];
  inGame: boolean;
}

export interface Race {
  name: string;
  skills: string[];
  notes: string;
}

export interface StartingSkill {
  name: string;
  source: SkillSource;
}

export interface Combo {
  race: string;
  profession: string;
  skills: string[];
  doubleSkills: string[];
}
