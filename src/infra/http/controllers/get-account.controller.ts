import { Controller, Get, HttpCode, NotFoundException, Param, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'

const getAccountParamSchema = z.string()

type GetAccountParamSchema = z.infer<typeof getAccountParamSchema>

@Controller('/accounts/:id')
@UsePipes(new ZodValidationPipe(getAccountParamSchema))
export class GetAccountController {
    constructor(private prisma: PrismaService) {}

    @Get()
    @HttpCode(200)
    async handle(@Param('id') id: GetAccountParamSchema) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            throw new NotFoundException('User not found.')
        }
        
        return {
            user
        }
    }
}
