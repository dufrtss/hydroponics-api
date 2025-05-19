// import { AppModule } from '@/infra/app.module'
// import { PrismaService } from '@/infra/database/prisma/prisma.service'
// import { INestApplication } from '@nestjs/common'
// import { JwtService } from '@nestjs/jwt'
// import { Test } from '@nestjs/testing'
// import { hash } from 'bcryptjs'
// import { Model } from 'mongoose'
// import request from 'supertest'
// import { getModelToken } from '@nestjs/mongoose'
// import { Measurement as MeasurementSchema } from '@/infra/database/mongoose/schemas/measurement.schema'

// describe('Fetch Ambient Humidity (E2E)', () => {
//     let app: INestApplication
//     let measurements: Model<MeasurementSchema>
//     let prisma: PrismaService
//     let jwt: JwtService

//     beforeAll(async () => {
//         const moduleRef = await Test.createTestingModule({
//             imports: [AppModule]
//         }).compile()

//         app = moduleRef.createNestApplication()

//         measurements = moduleRef.get(
//             getModelToken(MeasurementSchema.name)
//         )

//         prisma = moduleRef.get(PrismaService)
//         jwt = moduleRef.get(JwtService)

//         await app.init()
//     })
    
//     test('[GET] /measurements/ambient/humidity', async () => {
//         const user = await prisma.user.create({
//             data: {
//                 name: 'John Smith',
//                 email: 'johnsmith@example.com',
//                 password: await hash('123456', 8)
//             }
//         })

//         const accessToken = jwt.sign({ sub: user.id })

//         await measurements.create({
//             sensor: 'DHT22',
//             timestamp: new Date().getTime(),
//             data: {
//                 value: 23.32,
//                 unit: '°C'
//             }
//         })

//         await measurements.create({
//             sensor: 'DS18B20',
//             timestamp: new Date().getTime(),
//             data: {
//                 value: 32.23,
//                 unit: '°C'
//             }
//         })

//         const response = await request(app.getHttpServer())
//             .get('/measurements/ambient/humidity')
//             .set('Authorization', `Bearer ${accessToken}`)
//             .send()

//         expect(response.statusCode).toBe(200)
//         expect(response.body).toEqual({
//             measurements: [
//                 expect.objectContaining({ sensor: 'DHT22' }),
//                 expect.objectContaining({ sensor: 'DS18B20' })
//             ]
//         })
//     })
// })
