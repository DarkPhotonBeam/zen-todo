/*
  Warnings:

  - The values [SHORT,MEDIUM,LONG,UNKNOWN] on the enum `TodoLength` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TodoLength_new" AS ENUM ('A_SHORT', 'B_MEDIUM', 'C_UNKNOWN', 'D_LONG');
ALTER TABLE "public"."todo" ALTER COLUMN "length" DROP DEFAULT;
ALTER TABLE "todo" ALTER COLUMN "length" TYPE "TodoLength_new" USING ("length"::text::"TodoLength_new");
ALTER TYPE "TodoLength" RENAME TO "TodoLength_old";
ALTER TYPE "TodoLength_new" RENAME TO "TodoLength";
DROP TYPE "public"."TodoLength_old";
ALTER TABLE "todo" ALTER COLUMN "length" SET DEFAULT 'C_UNKNOWN';
COMMIT;

-- AlterTable
ALTER TABLE "todo" ALTER COLUMN "length" SET DEFAULT 'C_UNKNOWN';
