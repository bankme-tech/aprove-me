# ChatGPT 3.5 prompts
## You
Write an UserRepository following Nestjs @Injectable() pattern and Prisma database.
User have this interface:
```typescript
export interface IUnsafeUser {
  login: string;

  // Sensitive data that should not be selected
  password: string;
  salt: string;
}

type IUserSensitiveData = Pick<IUnsafeUser, "password" | "salt">;
export type IUser = Omit<IUnsafeUser, keyof IUserSensitiveData>;
export type ICredentials = Pick<IUnsafeUser, 'login' | 'password'>;
```
UserRepository should have the following methods: 
- create: create one user.
- exists: check if user exists and returns boolean. 
- findOne: get by login but don't hide password and salt.
- findOneWithUnsafeData: get user with all data.

## Chat
Here's an example of how you can create a `UserRepository` following the NestJS `@Injectable()` pattern using Prisma for the database operations:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'path/to/prisma.service';
import { IUser, ICredentials } from './user.interface';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: IUser): Promise<IUser> {
    return this.prisma.user.create({ data: user });
  }

  async exists(login: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { login } });
    return !!user;
  }

  async findOne(login: string): Promise<IUser> {
    return this.prisma.user.findUnique({ where: { login } });
  }

  async findOneWithUnsafeData(login: string): Promise<IUnsafeUser | null> {
    return this.prisma.user.findUnique({
      where: { login },
      select: { login: true, password: true, salt: true },
    });
  }

  async findByCredentials(credentials: ICredentials): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: { login: credentials.login, password: credentials.password },
    });
  }
}
```

Explanation:

- The `UserRepository` class is annotated with `@Injectable()` to allow it to be injected into other components.
- In the constructor, the `PrismaService` is injected, which allows us to interact with the Prisma client.
- The `create` method inserts a new user into the database.
- The `exists` method checks if a user with the given login already exists in the database.
- The `findOne` method retrieves a user by their login, without hiding the password and salt.
- The `findOneWithUnsafeData` method retrieves a user with all data, including the password and salt.
- The `findByCredentials` method retrieves a user by their login and password.
