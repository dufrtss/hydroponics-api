import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { GetAccountUseCase } from '@/domain/account/application/use-cases/get-account'
import { AccountNotFoundError } from '@/domain/account/application/use-cases/errors/account-not-found-error'
import { AccountPresenter } from '../presenters/account-presenter'

const getAccountParamSchema = z.string()

type GetAccountParamSchema = z.infer<typeof getAccountParamSchema>

@Controller('/accounts/:id')
@UsePipes(new ZodValidationPipe(getAccountParamSchema))
export class GetAccountController {
    constructor(private getAccount: GetAccountUseCase) {}

    @Get()
    @HttpCode(200)
    async handle(@Param('id') id: GetAccountParamSchema) {
        const result = await this.getAccount.execute({
            id
        })

        if (result.isLeft()) {
            const error = result.value
                
            switch (error.constructor) {
            case AccountNotFoundError:
                throw new NotFoundException(error.message)
            default:
                throw new BadRequestException(error.message)
            }
        }

        const account = result.value.account

        return {
            account: AccountPresenter.toHTTP(account)
        }
    }
}
