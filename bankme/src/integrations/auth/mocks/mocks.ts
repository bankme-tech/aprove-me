import { fakerPT_BR } from '@faker-js/faker';

export const loginInfo = {
  email: fakerPT_BR.internet.email(),
  password: fakerPT_BR.internet.password(),
};

export const wrongLoginInfo = {
  email: 'invalid@email.com',
  password: 'invalidpassword',
};
