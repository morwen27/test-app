import { Injectable, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseStatus } from '../models/response-status';

@Injectable()
export class NotificationsService {

  handleSuccess<T>(operation: string) {
    console.log(operation)
   }
  
  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${error.status}`);
      return of(result as T);
    };
  }

  showNotification() { 

  }
}
