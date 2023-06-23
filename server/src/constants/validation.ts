
export const validationConstants = {
  user: {
    name: {
      message: 'Name must be with at least two words with valid characters.',
      min: 3,
      max: 140,
    },
    phone: {
        min: 3,
        max: 20,
        message: 'Phone has to be 10 or 11 characters long',
    },
    email: {
        min: 3,
        max: 140,
    },
    document: {
        min: 3,
        max: 30,
    },
    password: {
      message: 'The password must contain uppercase, lowercase, numbers with size between 8 and 250 characters.',
    }
  },
  default: {}
};
