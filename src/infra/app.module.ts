import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvModule } from './env/env.module'

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
        HttpModule,
        EnvModule
    ]
})
export class AppModule {}
