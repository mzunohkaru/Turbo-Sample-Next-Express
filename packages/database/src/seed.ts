import { PrismaClient } from "@prisma/client/extension"

const prisma = new PrismaClient()

async function Seed() {
  const userData = {
    name: 'テストユーザー',
    email: 'test@example.com',
  }

  await prisma.user.create({
    data: userData,
  })
}

Seed()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
