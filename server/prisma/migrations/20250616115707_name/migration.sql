-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "class" TEXT NOT NULL DEFAULT '',
    "total" INTEGER,
    "average" REAL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "schoolId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("average", "code", "createdAt", "id", "name", "password", "role", "schoolId", "total", "updatedAt") SELECT "average", "code", "createdAt", "id", "name", "password", "role", "schoolId", "total", "updatedAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_code_key" ON "Student"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
