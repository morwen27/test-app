import { Directive, ViewChild, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRefModal]'
})
export class RefModalDirective {
  constructor(
    public containerRef: ViewContainerRef
  ) { }

}
