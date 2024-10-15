/*
  Warnings:

  - You are about to drop the `FolderStructure` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `FolderStructure`;

-- CreateTable
CREATE TABLE `Storage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileSystem` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
