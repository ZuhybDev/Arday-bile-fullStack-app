"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalAndAverage = void 0;
const calculateTotalAndAverage = (grade) => {
    const total = grade.reduce((sum, grade) => sum + grade, 0);
    const average = grade.length > 0 ? total / grade.length : 0;
    return { total, average };
};
exports.calculateTotalAndAverage = calculateTotalAndAverage;
//# sourceMappingURL=totalAndAverage.js.map