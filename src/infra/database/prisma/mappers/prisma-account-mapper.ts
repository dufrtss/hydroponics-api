import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Account } from '@/domain/account/enterprise/entities/account'
import { User as PrismaAccount, Prisma } from '@prisma/client'

export class PrismaAccountMapper {
    static toDomain(raw: PrismaAccount): Account {
        return Account.create(
            {
                name: raw.name,
                email: raw.email,
                password: raw.password,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt
            },
            new UniqueEntityID(raw.id)
        )
    }

    static toPersistence(account: Account): Prisma.UserUncheckedCreateInput {
        return {
            id: account.id.toString(),
            name: account.name,
            email: account.email,
            password: account.password,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt
        }
    }
}
