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

    it('/users/:id (PUT) not authorized', async () => {
        const response = await request(app.getHttpServer())
            .put('/users/1')
            .send({
                email: 'updated@admin.com',
                name: 'updated',
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it('/users/:id (PUT) update user', async () => {
        const responseUser = await request(app.getHttpServer())
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);

        expect(responseUser.statusCode).toBe(200);
        expect(responseUser.body.name).toBe('admin');
        expect(responseUser.body.email).toBe('admin@admin.com');

        const responseUserUpdated = await request(app.getHttpServer())
            .put('/users/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: 'updated@admin.com',
                name: 'updated',
            });

        expect(responseUserUpdated.statusCode).toBe(200);
        expect(responseUserUpdated.body.name).toBe('updated');
        expect(responseUserUpdated.body.email).toBe('updated@admin.com');
    });



    it('/users/:id (PUT) missing name', async () => {
        const response = await request(app.getHttpServer())
            .put('/users/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: 'updated@admin.com',
                // name: 'updated',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual(['name should not be empty']);
    });


    it('/users/:id (PUT) missing email', async () => {
        const response = await request(app.getHttpServer())
            .put('/users/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                // email: 'updated@admin.com',
                name: 'updated',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual(['email must be an email']);
    });

    it('/users/:id (PUT) invalid email', async () => {
        const response = await request(app.getHttpServer())
            .put('/users/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: 'updated',
                name: 'updated',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual(['email must be an email']);
    });
});
