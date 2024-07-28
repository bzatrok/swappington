/*
  Warnings:

  - Added the required column `urlExpiresAt` to the `PictureModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PictureModel" ADD COLUMN     "urlExpiresAt" TIMESTAMP(3) NOT NULL;
