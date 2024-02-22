export const config = () => ({
  port: process.env.PORT || 3001,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT || 6379,
  smtp_host_name: process.env.SMTP_HOST_NAME,
  smtp_port: process.env.SMTP_PORT || 587,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
})