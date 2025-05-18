import { PaginationParams } from '@/core/repositories/pagination-params'
import { AccountsRepository } from '@/domain/account/application/repositories/accounts-repository'
import { Account } from '@/domain/account/enterprise/entities/account'
import { PrismaService } from '../prisma.service'
import { PrismaAccountMapper } from '../mappers/prisma-account-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
    constructor(private prisma: PrismaService) {}
    
    async findById(id: string): Promise<Account | null> {
        const account = await this.prisma.user.findUnique({
            where: {
                id
            }
        })
        
        if (!account) {
            return null
        }

        return PrismaAccountMapper.toDomain(account)
    }

    async findByEmail(email: string): Promise<Account | null> {
        const account = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!account) {
            return null
        }

        return PrismaAccountMapper.toDomain(account)
    }

    async findMany({ page }: PaginationParams): Promise<Account[]> {
        const accounts = await this.prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return accounts.map((account) => {
            return PrismaAccountMapper.toDomain(account)
        })
    }

    async create(account: Account): Promise<void> {
        const data = PrismaAccountMapper.toPersistence(account)

        await this.prisma.user.create({
            data
        })
    }

    async update(account: Account): Promise<void> {
        const data = PrismaAccountMapper.toPersistence(account)

        await this.prisma.user.update({
            where: {
                id: account.id.toString()
            },
            data
        })
    }

    async delete(account: Account): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: account.id.toString()
            }
        })
    }
}
