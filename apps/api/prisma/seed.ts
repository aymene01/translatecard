import { PrismaClient } from '@prisma/client'
import { cards } from './data';

const prisma = new PrismaClient()

async function createCard(card: { content: string; traduction: string; title: string }) {
  return prisma.card.create({ data: card })
}

async function main() {
  try {
    await Promise.all(cards.map(card => createCard(card)))
  } catch (error) {
    console.error('Error occurred while creating cards:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
