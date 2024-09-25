import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const userData = {
    userName: '田中卓志',
    email: 'tanaka@example.com',
    password: 'password',
  }

  try {
    const user = await prisma.users.create({
      data: userData,
    })
    console.log(`ユーザーが作成されました: ${user.userName}`)
  } catch (error) {
    console.error('シード処理中にエラーが発生しました:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
