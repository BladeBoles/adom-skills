import { Race } from './types';

export const RACES: Race[] = [
  {
    name: 'Human',
    skills: ['Climbing', 'Food Preservation', 'Haggling', 'Swimming'],
    notes: 'none',
  },
  {
    name: 'Troll',
    skills: [
      'Athletics',
      'Bridge Building',
      'Climbing',
      'Food Preservation',
      'Gemology',
      'Mining',
    ],
    notes: 'none',
  },
  {
    name: 'High Elf',
    skills: ['Climbing', 'Dodge', 'Listening', 'Literacy', 'Stealth'],
    notes: 'none',
  },
  {
    name: 'Gray Elf',
    skills: ['Climbing', 'Dodge', 'Listening', 'Literacy', 'Stealth'],
    notes: 'none',
  },
  {
    name: 'Dark Elf',
    skills: ['Alertness', 'Climbing', 'Find Weakness', 'Stealth'],
    notes: 'none',
  },
  {
    name: 'Dwarf',
    skills: ['Climbing', 'Detect Traps', 'Metallurgy', 'Mining', 'Smithing'],
    notes: 'none',
  },
  {
    name: 'Gnome',
    skills: [
      'Climbing',
      'Gemology',
      'Listening',
      'Mining',
      'Pick Pockets',
      'Ventriloquism',
    ],
    notes: 'none',
  },
  {
    name: 'Hurthling',
    skills: ['Archery', 'Cooking', 'Food Preservation', 'Gardening', 'Stealth'],
    notes: 'none',
  },
  {
    name: 'Orc',
    skills: ['Backstabbing', 'Find Weakness', 'Metallurgy', 'Mining'],
    notes: 'none',
  },
  {
    name: 'Drakeling',
    skills: ['Alertness', 'Food Preservation', 'Music', 'Swimming'],
    notes: 'none',
  },
  {
    name: 'Mist Elf',
    skills: ['Alertness', 'Concentration', 'Dodge', 'Literacy', 'Necromancy'],
    notes: 'none',
  },
  {
    name: 'Ratling',
    skills: ['Appraising', 'Detect Item Status', 'Survival', 'Swimming'],
    notes: 'none',
  },
];

export const RACE_NAMES = [
  'Dark Elf',
  'Drakeling',
  'Dwarf',
  'Gnome',
  'Gray Elf',
  'High Elf',
  'Human',
  'Hurthling',
  'Mist Elf',
  'Orc',
  'Ratling',
  'Troll',
] as const;

export type RaceName = (typeof RACE_NAMES)[number];
