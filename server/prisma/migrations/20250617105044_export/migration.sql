/*
  Warnings:

  - You are about to drop the column `average` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Student` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "class" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "schoolId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("class", "code", "createdAt", "id", "name", "password", "role", "schoolId", "updatedAt") SELECT "class", "code", "createdAt", "id", "name", "password", "role", "schoolId", "updatedAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_code_key" ON "Student"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
