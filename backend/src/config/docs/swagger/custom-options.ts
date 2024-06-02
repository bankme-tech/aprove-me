import { SwaggerCustomOptions } from '@nestjs/swagger';

export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'Api-aprovame',
  customfavIcon: '',
  customCss:
    'img[alt="Swagger UI"] { display: block;-moz-box-sizing: border-box; box-sizing: border-box; content: url("https://i.imgur.com/2uSkYt5.png"); max-width: 100%; max-height: 100%; }.swagger-ui .topbar { background-color: #087F5B; padding: 10px 0;} .swagger-ui .topbar .wrapper { background-color: #087F5B; } .swagger-ui .info>div { margin: 0 0 5px; } .swagger-ui .info .main .title { font-family: "Montserrat",sans-serif; font-size: 36px; margin: 0; color: #0CA678; background-color: #fff} .swagger-ui .info .title span small { background-color: #FCC419 } .swagger-ui .info .title span small.version-stamp { background-color: #FCC419 } .swagger-ui .wrapper { box-sizing: border-box;margin: 0 auto;max-width: 1460px;padding: 0 20px; width: 100%; background-color: #fff;} .swagger-ui .btn.authorize { background-color: #E9FAC8; border-color: #0CA678; color: #0CA678; display: inline; line-height: 1; } .swagger-ui .btn.authorize svg { fill: #0CA678; }',
};
