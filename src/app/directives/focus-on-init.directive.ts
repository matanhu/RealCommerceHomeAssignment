import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocusOnInit]'
})
export class FocusOnInitDirective implements AfterViewInit {

  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }

}
