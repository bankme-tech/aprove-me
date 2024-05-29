import { Assignor } from '@prisma/client';

// DTOS
import { CreateAssignorDTO } from '../dtos/create-assignor.dto';
import { UpdateAssignorDTO } from '../dtos/update-assignor.dto';

export interface IAssignorService {
	createAssignor(data: CreateAssignorDTO): Promise<Assignor>;
	getAssignor(assignorId: string): Promise<Assignor | null>;
	findAll(): Promise<Assignor[]>;
	updateAssignor(
		id: string,
		updateAssignorDto: UpdateAssignorDTO,
	): Promise<Assignor>;
	deleteAssignor(id: string): Promise<Assignor>;
}
