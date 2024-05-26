import Assignor from "@/interfaces/Assignor";

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

export const validateAssignor = (fields: Omit<Assignor,'id'>) => {
  const { document, email, name, phone } = fields;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errors = [];
  if (document.length < 11) {
    errors.push('Insert a valid document');
  }
  if (name.length < 4) {
    errors.push('Name must have at least 4 characters');
  }
  if (phone.length < 11) {
    errors.push('Insert a valid phone');
  }
  if (!regex.test(email)) {
    errors.push('Insert a valid email');
  }
  return errors;
}