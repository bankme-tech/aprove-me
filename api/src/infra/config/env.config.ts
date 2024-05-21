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
});
