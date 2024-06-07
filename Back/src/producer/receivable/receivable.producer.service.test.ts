import { CreateReceivableDto } from "@/app/receivable/dto/createReceivable.dto";
import { ClientProxy } from "@nestjs/microservices";
import { Test, TestingModule } from "@nestjs/testing";
import { ReceivableProducerService } from "./receivable.producer.service";

describe("ReceivableProducerService", () => {
    let service: ReceivableProducerService;
    let clientProxy: ClientProxy;

    const mockClientProxy = {
        emit: jest.fn()
    };

    const receivables: CreateReceivableDto[] = [
        { assignorEmail: "assignor1@example.com", value: 100, emissionDate: new Date().toISOString() },
        { assignorEmail: "assignor2@example.com", value: 200, emissionDate: new Date().toISOString() }
    ];
    const email = "manager@example.com";
    const quantity = receivables.length;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReceivableProducerService, { provide: ClientProxy, useValue: mockClientProxy }]
        }).compile();

        service = module.get<ReceivableProducerService>(ReceivableProducerService);
        clientProxy = module.get<ClientProxy>(ClientProxy);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("addToSaveReceivable", () => {
        it("should add receivables to save queue successfully", async () => {
            await service.addToSaveReceivable(receivables, email);

            expect(mockClientProxy.emit).toHaveBeenCalledTimes(quantity);
            expect(mockClientProxy.emit).toHaveBeenCalledWith("save-receivable", expect.anything());
        });

        it("should throw an error if addToSaveReceivable fails", async () => {
            const error = new Error("Failed to add receivables to queue");
            mockClientProxy.emit.mockImplementationOnce(() => {
                throw error;
            });

            await expect(service.addToSaveReceivable(receivables, email)).rejects.toThrow(error);
        });
    });
});
