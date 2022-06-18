import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable()
export class PersonService {
  private readonly personsUrl: string = 'http://localhost:3000/api/v1';

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private readonly http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.personsUrl}/persons`);
  }

  editPerson(person: Person): void {
    
   }

  removePerson(person: Person): Observable<Person> {
    const url = `http://localhost:3000/persons/${person.id}`;
    
    return this.http.delete<Person>(url, this.httpOptions);
  }
}
