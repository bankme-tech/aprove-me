import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'; // Ajuste conforme necessário

@Injectable()
export class SessionManagerService {
    private sessions: Map<string, User>;

    constructor() {
        this.sessions = new Map<string, User>();
    }

    createSession(token: string, user: User): void {
        this.sessions.set(token, user);
    }

    getSession(token: string): User | null {
        const session = this.sessions.get(token);
        return session || null;
    }

    removeSession(token: string): void {
        this.sessions.delete(token);
    }
}
