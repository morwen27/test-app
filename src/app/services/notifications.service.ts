import { Injectable, ViewChild } from '@angular/core';
import { interval, Observable, of, takeUntil, timer } from 'rxjs';
import { NotificationDirective } from '../directives/notification.directive';
import { ResponseSelectors, ResponseStatus } from '../models/response-status';
import { NotificationComponent } from '../notification/notification.component';

const LIFE_TIME_NOTIFICATION = 5000;

@Injectable()
export class NotificationsService {

  handleSuccess<T>(message: string) {
    this.showNotification(message, ResponseSelectors[1])
   }
  
  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.showNotification(ResponseStatus[error.status], ResponseSelectors[2]);
      return of(result as T);
    };
  }

  constructor(
    private readonly notificationDirective: NotificationDirective
  ) {}

  showNotification(message: string, selector: string) { 
    this.notificationDirective.containerRef.clear();

    const notification = this.notificationDirective.containerRef.createComponent(NotificationComponent);
    notification.instance.notification = {
      message: message,
      class: selector
    }

    timer(LIFE_TIME_NOTIFICATION)
      .pipe(takeUntil(notification.instance.destroyed$))
      .subscribe(() => this.notificationDirective.containerRef.clear())
  }
}
