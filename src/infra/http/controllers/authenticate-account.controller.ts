import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AuthenticateAccountUseCase } from '@/domain/account/application/use-cases/authenticate-account'
import { WrongCredentialsError } from '@/domain/account/application/use-cases/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'

const authenticateAccountBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type AuthenticateAccountBodySchema = z.infer<typeof authenticateAccountBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateAccountController {
    constructor(private authenticate: AuthenticateAccountUseCase) {}

    @Post()
    @UsePipes(new ZodValidationPipe(authenticateAccountBodySchema))
    async handle(@Body() body: AuthenticateAccountBodySchema) {
        const { email, password } = body

        const result = await this.authenticate.execute({ email, password })

        if (result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
            case WrongCredentialsError:
                throw new UnauthorizedException(error.message)
            default:
                throw new BadRequestException(error.message)
            }
        }

        const { accessToken } = result.value

        return {
            access_token: accessToken
        }
    }
}
