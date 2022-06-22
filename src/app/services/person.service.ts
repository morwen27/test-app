import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Person } from '../models/person';
import { NotificationsService } from './notifications.service';
import { ResponseStatus } from '../models/response-status';

@Injectable()
export class PersonService {
  private readonly personsUrl: string = 'http://localhost:3000/persons'; 

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private readonly http: HttpClient,
    private readonly notificationsService: NotificationsService,
  ) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl).pipe(  
      tap(() => this.notificationsService.handleSuccess(ResponseStatus[200])),
      catchError(this.notificationsService.handleError<Person[]>([]))
    );
  }

  editPerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.personsUrl}/${person.id}`, person, this.httpOptions)
      .pipe(
        tap(() => this.notificationsService.handleSuccess(ResponseStatus[200])),
        catchError(this.notificationsService.handleError<Person>({}))
      );
  }
  
  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.personsUrl, person, this.httpOptions)
      .pipe(
        tap(() => this.notificationsService.handleSuccess(ResponseStatus[200])),
        catchError(this.notificationsService.handleError<Person>({}))
      );    
   }

  removePerson(person: Person): Observable<Person> {    
    return this.http.delete<Person>(`${this.personsUrl}/${person.id}`, this.httpOptions)
      .pipe(
        tap(() => this.notificationsService.handleSuccess(ResponseStatus[200])),
        catchError(this.notificationsService.handleError<Person>({}))
      );
  }  
}
