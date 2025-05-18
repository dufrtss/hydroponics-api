import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()

function generateUniqueDatabaseUrl(schemaId: string) {
    if (!process.env.POSTGRES_DATABASE_URL) {
        throw new Error('POSTGRES_DATABASE_URL is not set as an environment variable.')
    }
    
    const url = new URL(process.env.POSTGRES_DATABASE_URL)

    url.searchParams.set('schema', schemaId)

    return url.toString()
}

const schemaId = randomUUID()

beforeAll(() => {
    const databaseURL = generateUniqueDatabaseUrl(schemaId)
    
    process.env.POSTGRES_DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')
})

afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`)
    await prisma.$disconnect()
})
