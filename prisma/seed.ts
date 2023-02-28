import { PrismaClient, tableType } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {

  await prisma.tables.createMany({
    skipDuplicates: true,
    data: [
      { type: tableType.Bar, size: 1 },
      { type: tableType.Bar, size: 1 },
      { type: tableType.Bar, size: 1 },
      { type: tableType.Bar, size: 1 },
      { type: tableType.SmallTable, size: 4 },
      { type: tableType.SmallTable, size: 4 },
      { type: tableType.SmallTable, size: 4 },
      { type: tableType.MedTable, size: 8 },
      { type: tableType.MedTable, size: 8 },
      { type: tableType.LargeTable, size: 12 },
      { type: tableType.LargeTable, size: 12 }
    ]
  });
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
