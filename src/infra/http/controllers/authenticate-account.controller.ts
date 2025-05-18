import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AuthenticateAccountUseCase } from '@/domain/account/application/use-cases/authenticate-account'

const authenticateAccountBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type AuthenticateAccountBodySchema = z.infer<typeof authenticateAccountBodySchema>

@Controller('/sessions')
export class AuthenticateAccountController {
    constructor(private authenticate: AuthenticateAccountUseCase) {}

    @Post()
    @UsePipes(new ZodValidationPipe(authenticateAccountBodySchema))
    async handle(@Body() body: AuthenticateAccountBodySchema) {
        const { email, password } = body

        const result = await this.authenticate.execute({ email, password })

        if (result.isLeft()) {
            throw new Error()
        }

        const { accessToken } = result.value

        return {
            access_token: accessToken
        }
    }
}
