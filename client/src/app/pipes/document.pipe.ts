import { Pipe, PipeTransform } from '@angular/core';
import { formatAssignorDocument } from '../helpers/format-assignor-document';

@Pipe({ name: 'document', standalone: true })
export class DocumentPipe implements PipeTransform {
  transform(value: string | number, hideSome: boolean = false): string {
    let document = value?.toString().padStart(14, '0').replace(/[^0-9]/g, '');
    return formatAssignorDocument(document, hideSome);
  }
}
