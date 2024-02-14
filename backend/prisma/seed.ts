import { PrismaClient } from '@prisma/client'
import { Role } from '../src/role/role.enum'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: {
            login: 'aprovame'
        },
        update: {},
        create: {
            login: 'aprovame',
            password: 'aprovame',
        }
    });

    const role = await prisma.role.create({
        data: {
            name: Role.User
        }
    });

    const userRole = await prisma.userRoles.create({
        data: {
            userId: user.id,
            roleId: role.id
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })