import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable()
export class PersonService {
  private readonly personsUrl: string = 'http://localhost:3000/persons'; 

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private readonly http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl);
  }

  editPerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.personsUrl}/${person.id}`, person, this.httpOptions);
  }
  
  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.personsUrl, person, this.httpOptions);    
   }

  removePerson(person: Person): Observable<Person> {    
    return this.http.delete<Person>(`${this.personsUrl}/${person.id}`, this.httpOptions);
  }
}
