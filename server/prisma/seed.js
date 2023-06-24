// import { PrismaClient } from '@prisma/client'
// import * as bcrypt from 'bcrypt';

const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
    const adminUser = await prisma.assignor.create({
        data: {
            email: 'admin@admin.com',
            phone: '11999999999',
            document: '12345678910',
            name: 'Admin',
            username: 'admin_username',
            password: await bcrypt.hash('admin', 10),
            createdBy: 'admin',
            updatedBy: 'admin'
        },
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