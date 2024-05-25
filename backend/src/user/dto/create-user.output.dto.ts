import { UserEntity } from '../entities/user.entity';

export type CreateUserOuputDTO = Pick<UserEntity, 'id' | 'login'>;
