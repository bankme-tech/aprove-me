import { Controller, Get } from '@nestjs/common';

@Controller(`app`)
export class AppController {
	@Get(`check`)
	public healthyCheck(): string {
		return `Server is running!!`;
	}
}
