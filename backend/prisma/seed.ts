import { PrismaClient } from '@prisma/client'
import { Role } from '../src/role/role.enum'

const prisma = new PrismaClient()

async function main() {

    const role = await prisma.role.upsert({
        where: {
            name: Role.Admin
        },
        update: {},
        create: {
            name: Role.Admin
        }
    });

    const user = await prisma.user.upsert({
        where: {
            login: 'aprovame'
        },
        update: {
            roleId: role.id,
        },
        create: {
            login: 'aprovame',
            password: 'aprovame',
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