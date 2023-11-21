import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { PayableRepository } from "./payable.repository";

// Estrutura de um recebível
// CAMPO	TIPO	DESCRIÇÃO
// id	string (UUID)	É a identificação de um recebível.
// value	float	É o valor do recebível.
// emissionDate	date	É a data de emissão do recebível.
// assignor	int	Representa a identificação de um cedente.
// Estrutrua de um cedente
// CAMPO	TIPO	DESCRIÇÃO
// document	string(30)	É o documento CPF ou CNPJ do cedente.
// email	string(140)	É o email do cedente.
// phone	string(20)	É o telefone do cedente.
// name	string(140)	É a nome ou razão social do cedente.

@Controller('/integrations/payable')
export class PayableController {
    constructor(private payableRepository: PayableRepository) { }

    @Post()
    async create(@Body() payable: any) {
        // Verifica se o id do payable é um UUID válido
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(payable.id)) {
            throw new HttpException('O id do recebível deve ser um UUID válido', HttpStatus.BAD_REQUEST);
        }

        // Verifica se as strings têm o tamanho máximo permitido
        if (payable.assignor.document.length > 30) {
            throw new HttpException('O documento do cedente deve ter no máximo 30 caracteres', HttpStatus.BAD_REQUEST);
        }
        if (payable.assignor.email.length > 140) {
            throw new HttpException('O email do cedente deve ter no máximo 140 caracteres', HttpStatus.BAD_REQUEST);
        }
        if (payable.assignor.phone.length > 20) {
            throw new HttpException('O telefone do cedente deve ter no máximo 20 caracteres', HttpStatus.BAD_REQUEST);
        }
        if (payable.assignor.name.length > 140) {
            throw new HttpException('O nome do cedente deve ter no máximo 140 caracteres', HttpStatus.BAD_REQUEST);
        }

        return this.payableRepository.create(payable);
    }
}