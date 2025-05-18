import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch Accounts (E2E)', () => {
    let app: INestApplication
    let prisma: PrismaService
    let jwt: JwtService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()

        prisma = moduleRef.get(PrismaService)
        jwt = moduleRef.get(JwtService)

        await app.init()
    })
    
    test('[GET] /accounts', async () => {
        const user = await prisma.user.create({
            data: {
                name: 'John Smith',
                email: 'johnsmith@example.com',
                password: await hash('123456', 8)
            }
        })

        const accessToken = jwt.sign({ sub: user.id })
        
        await prisma.user.createMany({
            data: [{
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: await hash('123456', 8)
            }, {
                name: 'Jane Doe',
                email: 'janedoe@example.com',
                password: await hash('123456', 8)
            }]
        })

        const response = await request(app.getHttpServer())
            .get('/accounts')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            accounts: [
                expect.objectContaining({ name: 'John Doe' }),
                expect.objectContaining({ name: 'Jane Doe' }),
                expect.objectContaining({ name: 'John Smith' })
            ]
        })
    })
})
