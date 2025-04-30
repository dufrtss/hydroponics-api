import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MeasurementsModule } from './domain/measurements/measurements.module'
import { PrismaService } from './infrastructure/prisma/prisma.service'
import { GetAccountController } from './infrastructure/http/controllers/get-account.controller'
import { CreateAccountController } from './infrastructure/http/controllers/create-account.controller'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://192.168.10.4:27017', {
            dbName: 'hydroponics'
        }),
        MeasurementsModule
    ],
    controllers: [
        GetAccountController,
        CreateAccountController
    ],
    providers: [
        PrismaService
    ]
})
export class AppModule {}
