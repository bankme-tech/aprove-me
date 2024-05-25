"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../../src/app.module");
describe('AppController (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('Ao fazer requisição GET na rota /integrations/payable deve retornar status 200 e um array', () => {
        return request(app.getHttpServer())
            .get('/integrations/payable')
            .expect(200)
            .expect((res) => {
            expect(res.body).toBeInstanceOf(Array);
        });
    });
});
//# sourceMappingURL=test.controler.e2e-spec.js.map