import 'dotenv/config'

import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

import { startOfDay } from 'date-fns'

export const timePeriodQueryParamSchema = z.object({
    from: z
        .string()
        .optional()
        .transform((value) => value ? new Date(value) : startOfDay(new Date())),
    to: z
        .string()
        .optional()
        .transform((value) => value ? new Date(value) : new Date())
})

export type TimePeriodQueryParamSchema = z.infer<typeof timePeriodQueryParamSchema>
export const timePeriodQueryValidationPipe = new ZodValidationPipe(timePeriodQueryParamSchema)
