import 'dotenv/config'
import { ConfigService } from '@nestjs/config'
import { EnvService } from '@/infra/env/env.service'
import { Env } from '@/infra/env/env'

import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

import { toZonedTime, fromZonedTime } from 'date-fns-tz'
import { startOfDay } from 'date-fns'

const configService = new ConfigService<Env, true>()
const env = new EnvService(configService)

export const timePeriodQueryParamSchema = z.object({
    from: z
        .string()
        .optional()
        .transform((value) => {
            const date = value ? new Date(value) : new Date()
            const zoned = toZonedTime(date, env.get('TIMEZONE'))
            const start = startOfDay(zoned)
            return fromZonedTime(start, env.get('TIMEZONE'))
        }),
    to: z
        .string()
        .optional()
        .transform((value) => {
            const date = value ? new Date(value) : new Date()
            const zoned = toZonedTime(date, env.get('TIMEZONE'))
            return fromZonedTime(zoned, env.get('TIMEZONE'))
        })
})

export type TimePeriodQueryParamSchema = z.infer<typeof timePeriodQueryParamSchema>
export const timePeriodQueryValidationPipe = new ZodValidationPipe(timePeriodQueryParamSchema)
