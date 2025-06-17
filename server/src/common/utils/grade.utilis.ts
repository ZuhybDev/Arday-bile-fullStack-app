export const calculationLetterGrade = (
  grade: number,
  passMark: number,
): string => {
  const percentBoundaries = {
    A: passMark,
    B: passMark * 0.8,
    C: passMark * 0.6,
    D: passMark * 0.5,
  };
  if (grade >= percentBoundaries.A) return 'A';
  if (grade >= percentBoundaries.B) return 'B';
  if (grade >= percentBoundaries.C) return 'C';
  if (grade >= percentBoundaries.D) return 'D';

  return 'F';
};
