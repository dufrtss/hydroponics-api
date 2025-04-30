import { Controller, Get, HttpCode } from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Controller('/accounts')
export class GetAccountController {
    constructor(private prisma: PrismaService) {}

    @Get()
    @HttpCode(200)
    async handle() {
        return await this.prisma.user.findMany()
    }
}
