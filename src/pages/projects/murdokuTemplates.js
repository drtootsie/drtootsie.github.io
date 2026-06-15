export const CHARACTERS = [
  { id: 'v', name: 'Victim', icon: '💀', color: 'dark' },
  { id: 's1', name: 'The Butler', icon: '🤵', color: 'primary' },
  { id: 's2', name: 'The Heiress', icon: '💎', color: 'info' },
  { id: 's3', name: 'The Chef', icon: '👨‍🍳', color: 'warning' },
  { id: 's4', name: 'The Professor', icon: '🎓', color: 'secondary' },
  { id: 's5', name: 'The Doctor', icon: '🩺', color: 'success' },
  { id: 's6', name: 'The Gardener', icon: '👨‍🌾', color: 'success' },
  { id: 's7', name: 'The Maid', icon: '🧹', color: 'info' },
  { id: 's8', name: 'The Lawyer', icon: '💼', color: 'dark' },
];

export const FURNITURE_ICONS = {
  piano: '🎹',
  bookshelf: '📚',
  plant: '🪴',
  fireplace: '🔥',
  statue: '🗿',
  clock: '🕰️',
  bed: '🛏️',
  desk: '🖥️',
  tv: '📺',
};

export const TEMPLATES = [
  {
    id: 1,
    name: "The Manor Mystery",
    rooms: [
      0, 0, 0, 1, 1, 1, 2, 2, 2,
      0, 0, 0, 1, 1, 1, 2, 2, 2,
      0, 0, 0, 1, 1, 1, 2, 2, 2,
      3, 3, 3, 4, 4, 4, 5, 5, 5,
      3, 3, 3, 4, 4, 4, 5, 5, 5,
      3, 3, 3, 4, 4, 4, 5, 5, 5,
      6, 6, 6, 7, 7, 7, 8, 8, 8,
      6, 6, 6, 7, 7, 7, 8, 8, 8,
      6, 6, 6, 7, 7, 7, 8, 8, 8,
    ],
    furniture: {
      10: 'piano',
      22: 'bookshelf',
      31: 'plant',
      40: 'fireplace',
      58: 'statue',
      76: 'clock',
    },
    clues: [
      { text: "The Butler (🤵) was in the same room as the Piano (🎹).", type: "SAME_ROOM", char: "s1", target: "piano" },
      { text: "The Heiress (💎) was in the top-most row.", type: "ROW", char: "s2", value: 0 },
      { text: "The Chef (👨‍🍳) was in the last column.", type: "COL", char: "s3", value: 8 },
      { text: "The Victim (💀) was beside the Fireplace (🔥).", type: "BESIDE", char: "v", target: "fireplace" },
      { text: "The Professor (🎓) was in the bottom-right room.", type: "ROOM", char: "s4", value: 8 },
      { text: "The Doctor (🩺) was exactly two rows below the Heiress.", type: "ROW_RELATIVE", char: "s5", target: "s2", offset: 2 },
    ],
    murdererId: 's6' // Randomly chosen for the logic
  },
  {
    id: 2,
    name: "The Penthouse Peril",
    rooms: [
      0, 0, 1, 1, 1, 2, 2, 3, 3,
      0, 0, 1, 1, 1, 2, 2, 3, 3,
      0, 0, 1, 1, 1, 2, 2, 3, 3,
      4, 4, 4, 4, 4, 5, 5, 5, 5,
      4, 4, 4, 4, 4, 5, 5, 5, 5,
      6, 6, 7, 7, 7, 8, 8, 8, 8,
      6, 6, 7, 7, 7, 8, 8, 8, 8,
      6, 6, 7, 7, 7, 8, 8, 8, 8,
      6, 6, 7, 7, 7, 8, 8, 8, 8,
    ],
    furniture: {
      4: 'tv',
      13: 'bed',
      40: 'desk',
      60: 'plant',
      78: 'fireplace',
    },
    clues: [
      { text: "The Maid (🧹) was watching TV (📺).", type: "SAME_ROOM", char: "s7", target: "tv" },
      { text: "The Lawyer (💼) was in row 5.", type: "ROW", char: "s8", value: 5 },
      { text: "The Gardener (👨‍🌾) was in the first column.", type: "COL", char: "s6", value: 0 },
      { text: "The Victim (💀) was in the Master Bedroom (Room 1).", type: "ROOM", char: "v", value: 1 },
      { text: "The Professor (🎓) was beside the Desk (🖥️).", type: "BESIDE", char: "s4", target: "desk" },
    ],
    murdererId: 's1'
  }
];
