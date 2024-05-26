export const validateLogin = (login: string, password: string) => {
  if (!login || !password) {
    return { message: 'Please fill all fields'};
  }
  if (login.length < 4) {
    return { message: 'Username must have at least 4 characters'};
  }
  if (password.length < 6) {
    return { message: 'Password must have at least 6 characters'};
  }
  return { message: null };
}