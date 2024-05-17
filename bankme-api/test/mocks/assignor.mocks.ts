import { EditAssignorDto } from "src/modules/assignor/dto/editAssignor.dto";

export const result = {
  id: 1,
  document: 'documentTest',
  email: 'teste@gmail.com',
  phone: '21999999999',
  name: 'testName'
};

export const assignor = {
  document: 'documentTest',
  email: 'teste@gmail.com',
  phone: '21999999999',
  name: 'testName'
}

export const newAssignor = {
  document: 'newDocumentTest',
  email: 'Newteste@gmail.com',
  name: 'NewtestName'
} as EditAssignorDto;