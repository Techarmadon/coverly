import 'dotenv/config'
import crypto from 'node:crypto'
import { hashPassword } from 'better-auth/crypto'
import { prisma } from './client.js'

const email = (
  process.env.SEED_OWNER_EMAIL ?? 'owner@localhost.dev'
).toLowerCase()
const password = process.env.SEED_OWNER_PASSWORD ?? 'password1234'
const name = process.env.SEED_OWNER_NAME ?? 'Owner'

async function main() {
  const passwordHash = await hashPassword(password)
  const now = new Date()

  const existing = await prisma.user.findUnique({
    where: { email },
    include: { accounts: true },
  })

  if (existing) {
    const credential = existing.accounts.find(
      (a) => a.providerId === 'credential',
    )
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: existing.id },
        data: {
          role: 'owner',
          name,
          emailVerified: true,
          updatedAt: now,
        },
      })
      if (credential) {
        await tx.account.update({
          where: { id: credential.id },
          data: { password: passwordHash, updatedAt: now },
        })
      } else {
        await tx.account.create({
          data: {
            id: crypto.randomUUID(),
            userId: existing.id,
            accountId: existing.id,
            providerId: 'credential',
            password: passwordHash,
            createdAt: now,
            updatedAt: now,
          },
        })
      }
    })
    console.log(`Seed: updated owner user ${email}`)
    return
  }

  const userId = crypto.randomUUID()
  await prisma.user.create({
    data: {
      id: userId,
      name,
      email,
      emailVerified: true,
      role: 'owner',
      banned: false,
      createdAt: now,
      updatedAt: now,
      accounts: {
        create: {
          id: crypto.randomUUID(),
          accountId: userId,
          providerId: 'credential',
          password: passwordHash,
          createdAt: now,
          updatedAt: now,
        },
      },
    },
  })
  console.log(`Seed: created owner user ${email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
