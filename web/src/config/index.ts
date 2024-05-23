export const config = {
  get apiBaseURL() {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseURL) {
      throw new Error(
        'Enviroment variable NEXT_PUBLIC_API_BASE_URL is not defined',
      );
    }

    return baseURL;
  },
};
