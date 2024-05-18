import { env } from "process";

export const jwtConstants = {
  secret: env.JWT_SECRET,
};
