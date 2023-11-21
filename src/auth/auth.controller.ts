import { Body, Controller, Post } from "@nestjs/common";

@Controller('/integrations/auth')
export class AuthController {
    constructor() { }

    @Post()
    async create(@Body() auth: any) {
        // Verifica se "login" é igual a "aprovame" e "password" é igual a "aprovame"
        if (auth.login !== 'aprovame' || auth.password !== 'aprovame') {
            // Retorna um JWT inválido

        }
        // Retorna um JWT válido com expiração de 1 minuto
        
    }
}