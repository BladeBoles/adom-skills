export const PROFESSION_NAMES = [
  'Archer',
  'Assassin',
  'Barbarian',
  'Bard',
  'Beastfighter',
  'Chaos Knight',
  'Druid',
  'Duelist',
  'Elementalist',
  'Farmer',
  'Fighter',
  'Healer',
  'Merchant',
  'Mindcrafter',
  'Monk',
  'Necromancer',
  'Paladin',
  'Priest',
  'Ranger',
  'Thief',
  'Weaponsmith',
  'Wizard',
] as const;

export type ProfessionName = (typeof PROFESSION_NAMES)[number];

// Special profession notes
export const PROFESSION_NOTES: Record<string, string> = {
  Bard: 'Bards start with random skills',
  Merchant: 'Potion Merchants receive Alchemy',
};
