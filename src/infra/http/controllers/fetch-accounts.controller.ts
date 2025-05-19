import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchAccountsUseCase } from '@/domain/account/application/use-cases/fetch-accounts'
import { AccountPresenter } from '../presenters/account-presenter'
import { PaginationQueryParamSchema, paginationQueryValidationPipe } from '../validation/zod-pagination-params-validation'

@Controller('/accounts')
export class FetchAccountsController {
    constructor(private fetchAccounts: FetchAccountsUseCase) {}

    @Get()
    async handle(
        @Query(paginationQueryValidationPipe) { page, pageSize }: PaginationQueryParamSchema
    ) {
        const result = await this.fetchAccounts.execute({
            page,
            pageSize
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }

        const accounts = result.value.accounts

        return {
            accounts: accounts.map((account) => AccountPresenter.toHTTP(account))
        }
    }
}
