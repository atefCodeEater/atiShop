-- CreateTable
CREATE TABLE "Groups" (
    "isLastItem" BOOLEAN DEFAULT false,
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "image" TEXT,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "image" TEXT,
    "user_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    CONSTRAINT "Products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Products_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
