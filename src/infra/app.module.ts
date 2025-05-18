import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true
        }),
        MongooseModule.forRoot('mongodb://192.168.10.4:27017', {
            dbName: 'hydroponics'
        }),
        AuthModule,
        HttpModule
    ]
})
export class AppModule {}
