import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { Notification } from "../models/notification";


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnDestroy{
  destroyed$ = new Subject();

  notification: Notification = {
    message: '',
    class: '',
  }  

  ngOnDestroy() {    
    this.destroyed$.next;
  }
}
