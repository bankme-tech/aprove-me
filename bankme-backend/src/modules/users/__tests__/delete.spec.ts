import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/modules/app.module';
import { faker } from '@faker-js/faker';

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
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: 'admin',
            });

        token = response.body.access_token;
    });

    it('/users/:id (DELETE) not authorized', async () => {
        const response = await request(app.getHttpServer()).delete('/users/1');

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it('/users/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);

        await request(app.getHttpServer())
            .delete('/users/1')
            .set('Authorization', `Bearer ${token}`);

        const responseAfterDelete = await request(app.getHttpServer())
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(responseAfterDelete.statusCode).toBe(200);
        expect(responseAfterDelete.body).toHaveLength(0);
    });
});
