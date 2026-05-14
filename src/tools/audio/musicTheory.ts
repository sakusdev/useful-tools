export const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const

export const scales = {
  Major: [0, 2, 4, 5, 7, 9, 11],
  'Natural Minor': [0, 2, 3, 5, 7, 8, 10],
  'Harmonic Minor': [0, 2, 3, 5, 7, 8, 11],
  'Melodic Minor': [0, 2, 3, 5, 7, 9, 11],
  Dorian: [0, 2, 3, 5, 7, 9, 10],
  Phrygian: [0, 1, 3, 5, 7, 8, 10],
  Lydian: [0, 2, 4, 6, 7, 9, 11],
  Mixolydian: [0, 2, 4, 5, 7, 9, 10],
  Locrian: [0, 1, 3, 5, 6, 8, 10],
  'Major Pentatonic': [0, 2, 4, 7, 9],
  'Minor Pentatonic': [0, 3, 5, 7, 10],
  Blues: [0, 3, 5, 6, 7, 10],
} as const

export const chordTypes = {
  Major: [0, 4, 7],
  Minor: [0, 3, 7],
  Diminished: [0, 3, 6],
  Augmented: [0, 4, 8],
  Sus2: [0, 2, 7],
  Sus4: [0, 5, 7],
  Major7: [0, 4, 7, 11],
  Minor7: [0, 3, 7, 10],
  Dominant7: [0, 4, 7, 10],
  MinorMajor7: [0, 3, 7, 11],
  HalfDiminished7: [0, 3, 6, 10],
  Diminished7: [0, 3, 6, 9],
} as const

export function normalizePitch(value: string) {
  const clean = value.trim().replace('♯', '#').replace('♭', 'b')
  const flats: Record<string, string> = {
    Db: 'C#',
    Eb: 'D#',
    Gb: 'F#',
    Ab: 'G#',
    Bb: 'A#',
  }
  return flats[clean] ?? clean.toUpperCase().replace('B#', 'C').replace('E#', 'F')
}

export function noteIndex(note: string) {
  return noteNames.findIndex((name) => name === normalizePitch(note))
}

export function noteFromIndex(index: number) {
  return noteNames[((index % 12) + 12) % 12]
}

export function notesFromIntervals(root: string, intervals: readonly number[]) {
  const rootIndex = noteIndex(root)
  if (rootIndex < 0) return []
  return intervals.map((interval) => noteFromIndex(rootIndex + interval))
}

