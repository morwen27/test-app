import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[notifications]'
})
export class NotificationDirective {       constructor(
    public containerRef: ViewContainerRef
  ) {}
}
