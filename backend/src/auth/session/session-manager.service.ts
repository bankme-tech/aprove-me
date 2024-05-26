import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

interface Session {
  user: User;
  expiry: number;
}

@Injectable()
export class SessionManagerService {
  private sessions: Map<string, Session>;
  private expiryDuration: number;


  constructor() {
    this.sessions = new Map<string, Session>();
    const expiryMinutes = parseInt(process.env.SESSION_EXPIRY_MINUTES || '60');
    this.expiryDuration = expiryMinutes * 60 * 1000;
  }

  createSession(user: User): string {
    const token = uuidv4();
    const expiry = Date.now() + this.expiryDuration;
    this.sessions.set(token, { user, expiry });
    return token;
  }
  getAllSessions(): number {
    return this.sessions.size;
  }

  getSession(token: string): User | null {
    const session = this.sessions.get(token);
    if (!session) {
      return null;
    }



    if (session.expiry < Date.now()) {
      this.sessions.delete(token);
      return null;
    }

    return session.user;
  }

  removeSession(token: string): void {
    this.sessions.delete(token);
  }
}