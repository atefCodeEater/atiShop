/*
  Warnings:

  - You are about to drop the column `user_id` on the `Groups` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Groups" (
    "isLastItem" BOOLEAN DEFAULT false,
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "image" TEXT
);
INSERT INTO "new_Groups" ("id", "image", "isLastItem", "name") SELECT "id", "image", "isLastItem", "name" FROM "Groups";
DROP TABLE "Groups";
ALTER TABLE "new_Groups" RENAME TO "Groups";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
