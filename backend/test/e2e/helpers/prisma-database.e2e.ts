import { Assignor, Payable, PrismaClient, User } from '@prisma/client';
import { exec } from 'child_process';
import { AssignorEntity } from 'src/assignor/entities/assignor.entity';
import { PayableEntity } from 'src/payable/entities/payable.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class PrismaDatabaseHelper {
  constructor(private readonly prismaClient: PrismaClient) {}
  private readonly url = process.env.DATABASE_URL;
  private readonly databaseFile = 'prisma/test.db';

  async createDatabase(): Promise<void> {
    try {
      await this.executeCommand(
        `export DATABASE_URL=${this.url} && npx prisma migrate dev --schema prisma/schema.prisma`,
      );
      await this.executeCommand('npx prisma generate');
    } catch (error) {
      console.error('Error creating database:', error);
      throw error;
    }
  }

  async dropDatabase(): Promise<void> {
    try {
      await this.executeCommand('rm -rf prisma/test.db');
    } catch (error) {
      console.error('Error dropping database:', error);
      throw error;
    }
  }

  private async executeCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(command, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async addAssignor(assignor: AssignorEntity): Promise<void> {
    try {
      await this.prismaClient.assignor.create({
        data: {
          id: assignor.id,
          document: assignor.document,
          email: assignor.email,
          phone: assignor.phone,
          name: assignor.name,
        },
      });
    } catch (error) {
      console.error({ assignor });
    }
  }

  async findAssignor(id: string): Promise<Assignor> {
    return await this.prismaClient.assignor.findUnique({
      where: {
        id,
      },
    });
  }

  async findAllAssignors(): Promise<Assignor[]> {
    try {
      const assignors = await this.prismaClient.assignor.findMany();
      return assignors;
    } catch (error) {
      console.error(error);
    }
  }

  async clearAssignors(): Promise<void> {
    await this.prismaClient.assignor.deleteMany();
  }

  async addPayable(payable: PayableEntity): Promise<void> {
    await this.prismaClient.payable.create({
      data: {
        id: payable.id,
        assignorId: payable.assignorId,
        value: payable.value,
        emissionDate: payable.emissionDate,
      },
    });
  }

  async findPayable(id: string): Promise<Payable> {
    return await this.prismaClient.payable.findUnique({
      where: {
        id,
      },
    });
  }

  async clearPayables(): Promise<void> {
    await this.prismaClient.payable.deleteMany();
  }

  async addUser(user: UserEntity): Promise<void> {
    try {
      await this.prismaClient.user.create({
        data: {
          login: user.login,
          password: user.password,
        },
      });
    } catch (error) {
      console.error({ user });
    }
  }

  async findUser(login: string): Promise<User> {
    return await this.prismaClient.user.findUnique({
      where: {
        login,
      },
    });
  }

  async clearUsers(): Promise<void> {
    await this.prismaClient.user.deleteMany();
  }

  async clearDatabase(): Promise<void> {
    await this.clearPayables();
    await this.clearAssignors();
    await this.clearUsers();
  }
}
