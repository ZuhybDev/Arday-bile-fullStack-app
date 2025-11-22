export const calculateTotalAndAverage = (grade: number[]) => {
  const total = grade.reduce((sum, grade) => sum + grade, 0);

  const average = grade.length > 0 ? total / grade.length : 0;

  return { total, average };
};
