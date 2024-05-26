export const AppRoutes = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  payables: {
    index: '/payables',
    create: '/payables/create',
    edit: '/payables/edit/:id',
  },
  assignors: {
    index: '/assignors',
    create: '/assignors/create',
    edit: '/assignors/edit/:id',
  },
};
