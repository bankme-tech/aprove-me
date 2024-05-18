import { get_env_var } from './utils';

function config() {
  return {
    port: parseInt(get_env_var('PORT', '3003'), 10),
    database: {
      host: get_env_var('DATABASE_HOST', 'localhost'),
      user: get_env_var('DATABASE_USER', 'postgres'),
      password: get_env_var('DATABASE_PASSWORD', 'postgres'),
      database: get_env_var('DATABASE_NAME', 'postgres'),
      port: parseInt(get_env_var('DATABASE_PORT', '5432')),
    },
  };
}

export default config;
