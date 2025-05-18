import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvModule } from './env/env.module'
import { EnvService } from './env/env.service'

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            imports: [EnvModule],
            inject: [EnvService],
            useFactory: (envService: EnvService) => ({
                uri: envService.get('MONGODB_DATABASE_URL'),
                dbName: envService.get('MONGODB_DBNAME')
            })
        }),
        AuthModule,
        HttpModule,
        EnvModule
    ]
})
export class AppModule {}
