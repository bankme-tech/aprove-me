import { v4 as uuidv4 } from 'uuid';

export class Sequence {
  static getNext() {
    return uuidv4();
  }
}
