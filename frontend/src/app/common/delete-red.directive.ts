import {Directive, effect, ElementRef, HostListener, signal} from '@angular/core';

@Directive({
  selector: '[appDeleteRed]'
})
export class DeleteRedDirective {

  private backgroundColor = signal<string | null>(null);
  constructor(private el: ElementRef) {
    effect(() => {
      this.el.nativeElement.style.backgroundColor = this.backgroundColor()
    })
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor.set('red');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor.set(null);
  }

}
