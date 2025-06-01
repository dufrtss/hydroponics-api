import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

export const paginationQueryParamSchema = z.object({
    page: z
        .string()
        .optional()
        .default('1')
        .transform(Number)
        .pipe(z.number().min(1)),
    pageSize: z
        .string()
        .optional()
        .default('2016') // TODO: 1 week of sensor readings. Remove this and create proper routes to handle chart queries.
        .transform(Number)
        .pipe(z.number().min(5))
})

export type PaginationQueryParamSchema = z.infer<typeof paginationQueryParamSchema>
export const paginationQueryValidationPipe = new ZodValidationPipe(paginationQueryParamSchema)
