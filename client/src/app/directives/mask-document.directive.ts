import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[DocumentMask]',
  standalone: true,
})
export class DocumentMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const input = event.target;
    const cleaned = input.value.replace(/\D/g, '');

    if (cleaned.length <= 11) {
      input.value = this.maskCpf(cleaned);
    } else {
      input.value = this.maskCnpj(cleaned);
    }
  }

  private maskCpf(value: string): string {
    return value
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
  }

  private maskCnpj(value: string): string {
    return value
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
}
