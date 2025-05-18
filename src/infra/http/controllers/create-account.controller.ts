import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { RegisterAccountUseCase } from '@/domain/account/application/use-cases/register-account'
import { AccountAlreadyExistsError } from '@/domain/account/application/use-cases/errors/account-already-exists-error'

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
    constructor(private registerAccount: RegisterAccountUseCase) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema) {
        const { name, email, password } = body

        const result = await this.registerAccount.execute({
            name,
            email,
            password
        })

        if (result.isLeft()) {
            const error = result.value
        
            switch (error.constructor) {
            case AccountAlreadyExistsError:
                throw new ConflictException(error.message)
            default:
                throw new BadRequestException(error.message)
            }
        }
    }
}
