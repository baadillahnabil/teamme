import { PrismaClient } from '@prisma/client';
import * as faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.donation.deleteMany();

  const totalData = 100;
  Promise.all(
    Array.from({ length: totalData }).map(() =>
      prisma.donation.create({
        data: {
          count: faker.datatype.number(10),
          displayName: faker.name.findName(),
          email: faker.internet.email(),
          mobilePhone: faker.phone.phoneNumber(),
          team: `Team ${faker.company.companyName()}`,
          isAnonymous: faker.datatype.boolean(),
          message: faker.random.words(),
        },
      }),
    ),
  );
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
