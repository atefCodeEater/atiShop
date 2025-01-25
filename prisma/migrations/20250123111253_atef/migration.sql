-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "isAdmin" BOOLEAN DEFAULT false,
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT,
    "password" TEXT
);
INSERT INTO "new_users" ("email", "email_verified", "id", "image", "isAdmin", "name", "password") SELECT "email", "email_verified", "id", "image", "isAdmin", "name", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
