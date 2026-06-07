import { writable, derived } from 'svelte/store';

// Helper to generate unique IDs for added skills/abilities
const generateId = () => Math.random().toString(36).slice(2, 10);

export interface SkillItem {
  id?: string;
  name: string;
  desc?: string;
  attr?: string;
  die: string;
}

export interface LibraryItem {
  id?: string;
  name: string;
  desc?: string;
  category?: string;
}

// The default template for a brand-new, empty monster card
const emptyCard = {
  libraryId: '',
  name: '',
  type: '',
  descHtml: '',
  desc: '',
  imageData: '',
  imageZoom: 100,
  imageX: 0,
  imageY: 0,
  imageFrameSize: 135,
  attrs: {
    'Életerő': 'd6',
    'Erő': 'd6',
    'Ész': 'd6',
    'Lélek': 'd6',
    'Ügyesség': 'd6'
  },
  skills: [] as SkillItem[],
  edges: [] as LibraryItem[],
  hindrances: [] as LibraryItem[],
  abilities: [] as LibraryItem[],
  powers: [] as LibraryItem[],
  attacks: '',
  sizeMod: 0,
  armor: 0,
  paceMod: 0,
  parryMod: 0,
  toughMod: 0,
  showArmorLoc: false,
  armorLoc: { head: 0, torso: 0, arm: 0, leg: 0 },
  runDie: 'd6'
};

// The active card store
export const activeCard = writable({ ...emptyCard });

// Automatically derived statistics (Calculates combat math on the fly)
export const derivedStats = derived(activeCard, ($card) => {
  // Extract the numeric value from dice string strings (e.g., "d8" -> 8)
  const getDieValue = (dieStr: string) => parseInt(dieStr?.match(/d(\d+)/)?.[1] || '4');
  const getDieHalf = (dieStr: string) => Math.floor(getDieValue(dieStr) / 2);

  // Look for the "Közelharc" (Fighting) skill to calculate Parry
  const fightingSkill = $card.skills.find(s => s.name.toLowerCase() === 'közelharc');
  
  const pace = 6 + (Number($card.paceMod) || 0);
  const parry = (fightingSkill ? 2 + getDieHalf(fightingSkill.die) : 2) + (Number($card.parryMod) || 0);
  const tough = 2 + getDieHalf($card.attrs['Életerő']) + (Number($card.sizeMod) || 0) + (Number($card.armor) || 0) + (Number($card.toughMod) || 0);

  return { pace, parry, tough };
});

// Action helper to reset the editor
export function clearToNewCard() {
  activeCard.set(JSON.parse(JSON.stringify(emptyCard)));
}