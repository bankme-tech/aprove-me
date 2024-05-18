import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export function generateToken(user) {
  const payload = { username: user.username, sub: user.id };
  const secretKey = process.env.SECRET_KEY;

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}

export function verifyToken(token) {
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    return true;
  } catch (err) {
    return false;
  }
}