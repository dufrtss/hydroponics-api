import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MeasurementsModule } from './domain/measurements/measurements.module'
import { PrismaService } from './infrastructure/prisma/prisma.service'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://192.168.10.4:27017', {
            dbName: 'hydroponics'
        }),
        MeasurementsModule
    ],
    providers: [
        PrismaService
    ]
})
export class AppModule {}
