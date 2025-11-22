export const getMostFrequentyLetter = (letters: string[]): string => {
  const frequency: Record<string, number> = {};

  for (const letter of letters) {
    frequency[letter] = (frequency[letter] || 0) + 1;
  }
  /**
   * how about if we got @A 5times and @B 5times what we do its @TIE
   * so we creating a @TIEBREAKER we manually prioritize better grades using grade order
   */
  const gradePrioritize = ['A', 'B', 'C', 'D', 'F'];

  // sort by frequency descending
  const sorted = Object.entries(frequency).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];

    return gradePrioritize.indexOf(a[0]) - gradePrioritize.indexOf(b[0]);
  });

  return sorted[0]?.[0] ?? null;
};
