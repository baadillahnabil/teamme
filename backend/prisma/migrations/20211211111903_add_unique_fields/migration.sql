/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobilePhone]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Donation_email_key" ON "Donation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_mobilePhone_key" ON "Donation"("mobilePhone");
