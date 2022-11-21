import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function main() {
  await prisma.items.create({
    data: {
      title: "Coffee - Starbucks",
      description: "Coffee for programmers",
      quantity: 10.53
    }
  })

  
}

main();