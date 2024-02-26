import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/modules/app.module';

describe('Users (e2e)', () => {
    let app: INestApplication;

    let token = '';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());

        await app.init();

        const response = await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                name: 'admin',
                email: 'admin@admin.com',
                password: 'admin',
            });

        token = response.body.access_token;
    });

    it('/users/:id (GET) not authorized', async () => {
        const response = await request(app.getHttpServer()).get('/users/1');

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it('/users/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('admin');
        expect(response.body.email).toBe('admin@admin.com');
    });
});
