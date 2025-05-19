import 'dotenv/config'

// import { MongoClient } from 'mongodb'
import { PrismaClient } from '@prisma/client'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()

function generateUniqueDatabaseUrl(schemaId: string) {
    if (!process.env.POSTGRES_DATABASE_URL) {
        throw new Error('POSTGRES_DATABASE_URL is not set as an environment variable and is needed for testing.')
    }
    
    const url = new URL(process.env.POSTGRES_DATABASE_URL)

    url.searchParams.set('schema', schemaId)

    return url.toString()
}

const postgresSchemaId = randomUUID()
// const mongodbName      = `test_${randomUUID()}`

beforeAll(() => {
    const databaseURL = generateUniqueDatabaseUrl(postgresSchemaId)
    
    process.env.POSTGRES_DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    if (!process.env.MONGODB_DATABASE_URL) {
        throw new Error('MONGODB_DATABASE_URL is not set as an environment variable and is needed for testing.')
    }
    // TODO: CREATE ISOLATED ENVIRONMENTS FOR MONGODB TESTS
    // const mongodbURL = new URL(process.env.MONGODB_DATABASE_URL)

    // mongodbURL.pathname = `/${mongodbName}`
    // process.env.MONGODB_DATABASE_URL = mongodbURL.toString()

    // process.env.MONGODB_DBNAME = mongodbName
})

afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${postgresSchemaId}" CASCADE;`)
    await prisma.$disconnect()
    
    // const mongodbClient = new MongoClient(process.env.MONGODB_DATABASE_URL!)
    // await mongodbClient.connect()
    // await mongodbClient.db().dropDatabase()
    // await mongodbClient.close()
})
