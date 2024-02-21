import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { CreateUserBodyDTO } from "../dtos/CreateUserDTO";

@Injectable()
export class SendMailProducerService {
    constructor(@InjectQueue('mailQueue') private mailQueue: Queue) {}

    async sendMail(createUserDTO: CreateUserBodyDTO) {
        await this.mailQueue.add('mailJob', createUserDTO)
    }
}