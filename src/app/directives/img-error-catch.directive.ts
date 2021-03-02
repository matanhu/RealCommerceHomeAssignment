import { ElementRef } from '@angular/core';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'img'
})
export class ImgErrorCatchDirective {

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('error', ["$event"])
  onError(event: any): void {
    this.el.nativeElement.style.display = 'none';
  }

}
