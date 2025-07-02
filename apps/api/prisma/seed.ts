import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const facilities = [
    'Kitchen',
    'Free parking on premises',
    '43 inch TV with Netflix',
    'Wifi',
    'Pool',
    'Air conditioning',
    'Exterior security cameras on property',
    'Gym',
    'Water heater',
    'Hair dryer',
  ];

  for (const name of facilities) {
    await prisma.facility.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Seeding facilities done!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
