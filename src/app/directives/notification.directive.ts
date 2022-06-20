import { Directive, OnDestroy, ViewContainerRef } from '@angular/core';
import { Subject, timer } from 'rxjs';

@Directive({
  selector: '[notifications]'
})
export class NotificationDirective { 
  destroyed$ = new Subject();

  constructor(
    public containerRef: ViewContainerRef
  ) {}
}
