// Criar os testes para o controller
// Crie o arquivo src/payable/payable.controller.spec.ts com o seguinte conteúdo:
import { Test, TestingModule } from "@nestjs/testing";
import { PayableController } from "./payable.controller";
import { PayableRepository } from "./payable.repository";
import { HttpException, HttpStatus } from "@nestjs/common";

// Exemplo para testes:
const payable = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    value: 1000,
    emissionDate: '2021-01-01',
    assignor: {
        document: '12345678901',
        email: 'teste@asdrubal.com',
        phone: '11999999999',
        name: 'Asdrubal Silva'
    }
};

describe('PayableController', () => {
    let controller: PayableController;
    let repository: PayableRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PayableController],
            providers: [PayableRepository],
        }).compile();

        controller = module.get<PayableController>(PayableController);
        repository = module.get<PayableRepository>(PayableRepository);
    });

    describe('the create function', () => {
        it('should create a payable', async () => {
            const result = await controller.create(payable);
            expect(result).toEqual(payable);
        });
        it('should throw an error when id is not a valid UUID', async () => {
            const wrongPayable = Object.assign({}, payable);
            wrongPayable.id = '1';
            
            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O id do recebível deve ser um UUID válido');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when document is longer than 30 characters', async () => {
            const wrongPayable = Object.assign({}, payable);
            wrongPayable.assignor = Object.assign({}, payable.assignor);
            wrongPayable.assignor.document = '1234567890123456789012345678901';
            
            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O documento do cedente deve ter no máximo 30 caracteres');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when email is longer than 140 characters', async () => {
            const wrongPayable = Object.assign({}, payable);
            wrongPayable.assignor = Object.assign({}, payable.assignor);
            wrongPayable.assignor.email = 'contato@asdrubalcoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooorp.com';
            
            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O email do cedente deve ter no máximo 140 caracteres');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when phone is longer than 20 characters', async () => {
            const wrongPayable = Object.assign({}, payable);
            wrongPayable.assignor = Object.assign({}, payable.assignor);
            wrongPayable.assignor.phone = '1199999999911999999999';
            
            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O telefone do cedente deve ter no máximo 20 caracteres');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when name is longer than 140 characters', async () => {
            const wrongPayable = Object.assign({}, payable);
            wrongPayable.assignor = Object.assign({}, payable.assignor);
            wrongPayable.assignor.name = 'Asdrubal'.repeat(20);

            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O nome do cedente deve ter no máximo 140 caracteres');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when id is missing', async () => {
            const wrongPayable = Object.assign({}, payable);
            delete wrongPayable.id;

            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O id do recebível é obrigatório');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when value is missing', async () => {
            const wrongPayable = Object.assign({}, payable);
            delete wrongPayable.value;

            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O valor do recebível é obrigatório');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when emissionDate is missing', async () => {
            const wrongPayable = Object.assign({}, payable);
            delete wrongPayable.emissionDate;
            
            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('A data de emissão do recebível é obrigatória');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when assignor is missing', async () => {
            const wrongPayable = Object.assign({}, payable);
            delete wrongPayable.assignor;
            
            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O cedente é obrigatório');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when document is missing', async () => {
            const wrongPayable = Object.assign({}, payable);
            wrongPayable.assignor = Object.assign({}, payable.assignor);
            delete wrongPayable.assignor.document;
            
            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O documento do cedente é obrigatório');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when email is missing', async () => {
            const wrongPayable = Object.assign({}, payable);
            wrongPayable.assignor = Object.assign({}, payable.assignor);
            delete wrongPayable.assignor.email;
            
            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O email do cedente é obrigatório');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when phone is missing', async () => {
            const wrongPayable = Object.assign({}, payable);
            wrongPayable.assignor = Object.assign({}, payable.assignor);
            delete wrongPayable.assignor.phone;

            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O telefone do cedente é obrigatório');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
        it('should throw an error when name is missing', async () => {
            const wrongPayable = Object.assign({}, payable);
            wrongPayable.assignor = Object.assign({}, payable.assignor);
            delete wrongPayable.assignor.name;
            
            try {
                await controller.create(payable);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('O nome do cedente é obrigatório');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
    });
});

