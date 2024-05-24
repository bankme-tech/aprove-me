import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[PhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const input = event.target;
    const cleaned = input.value.replace(/\D/g, '');

    input.value = this.maskPhone(cleaned);
  }

  private maskPhone(value: string): string {
    if (value.length > 10) {
      return value
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
}
