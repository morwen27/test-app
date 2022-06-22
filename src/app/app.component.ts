import { Component } from '@angular/core';
import { NotificationDirective } from './directives/notification.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private readonly notificationDirective: NotificationDirective
  ) {}
}
