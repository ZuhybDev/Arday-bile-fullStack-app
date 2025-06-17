"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostFrequentyLetter = void 0;
const getMostFrequentyLetter = (letters) => {
    const frequency = {};
    for (const letter of letters) {
        frequency[letter] = (frequency[letter] || 0) + 1;
    }
    const gradePrioritize = ['A', 'B', 'C', 'D', 'F'];
    const sorted = Object.entries(frequency).sort((a, b) => {
        if (b[1] !== a[1])
            return b[1] - a[1];
        return gradePrioritize.indexOf(a[0]) - gradePrioritize.indexOf(b[0]);
    });
    return sorted[0][0];
};
exports.getMostFrequentyLetter = getMostFrequentyLetter;
//# sourceMappingURL=getMostFrequentyLetter.js.map