import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchAccountsUseCase } from '@/domain/account/application/use-cases/fetch-accounts'
import { AccountPresenter } from '../presenters/account-presenter'

const pageQueryParamSchema = z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/accounts')
export class FetchAccountsController {
    constructor(private fetchAccounts: FetchAccountsUseCase) {}

    @Get()
    async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
        const result = await this.fetchAccounts.execute({ page })

        if (result.isLeft()) {
            throw new BadRequestException()
        }

        const accounts = result.value.accounts

        return {
            accounts: accounts.map((account) => AccountPresenter.toHTTP(account))
        }
    }
}
