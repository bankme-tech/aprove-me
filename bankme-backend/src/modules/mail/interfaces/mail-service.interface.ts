// INTERFACES
import { ISendMailData } from './send-mail-data.interface';

export interface IMailService {
	sendEmail(data: ISendMailData): Promise<void>;
}
