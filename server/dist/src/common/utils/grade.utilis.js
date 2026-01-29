"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculationLetterGrade = void 0;
const calculationLetterGrade = (grade, passMark) => {
    const percentBoundaries = {
        A: passMark,
        B: passMark * 0.8,
        C: passMark * 0.6,
        D: passMark * 0.5,
    };
    if (grade >= percentBoundaries.A)
        return 'A';
    if (grade >= percentBoundaries.B)
        return 'B';
    if (grade >= percentBoundaries.C)
        return 'C';
    if (grade >= percentBoundaries.D)
        return 'D';
    return 'F';
};
exports.calculationLetterGrade = calculationLetterGrade;
//# sourceMappingURL=grade.utilis.js.map