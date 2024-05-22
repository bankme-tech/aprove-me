export const envConfig = () => ({
  get port() {
    const port = process.env.PORT;

    if (!port) {
      return 5000;
    }

    return port;
  },
  get frontendURL() {
    const frontend = process.env.FRONTEND_URL;

    if (!frontend) {
      throw new Error('Enviroment variable FRONTEND_URL is not defined');
    }

    return frontend;
  },
  get cryptRounds() {
    const rounds = process.env.CRYPT_ROUNDS;

    if (!rounds) {
      throw new Error('Enviroment variable CRYPT_ROUNDS is not defined');
    }

    const castedNumberRounds = Number(rounds);

    if (Number.isNaN(castedNumberRounds)) {
      throw new Error('It was no possible to cast CRYPT_ROUNDS to number');
    }

    return castedNumberRounds;
  },
  get jwtSecret() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('Enviroment variable JWT_SECRET is not defined');
    }

    return secret;
  },
  get jwtExpiresIn() {
    const expiresIn = process.env.JWT_EXPIRES_IN;

    if (!expiresIn) {
      throw new Error('Enviroment variable JWT_EXPIRES_IN is not defined');
    }

    return expiresIn;
  },
});
