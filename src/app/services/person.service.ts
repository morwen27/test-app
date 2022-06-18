import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable()
export class PersonService {
  private readonly url: string = '/posts/1';
  private persons: Person[] = [
    {
      id: 1,
      firstName: 'Alex',
      lastName: 'Pushkin',
    },
    {
      id: 2,
      firstName: 'Victor',
      lastName: 'Hugo',
    },
    {
      id: 3,
      firstName: 'Howard',
      lastName: 'Lovecraft',
    },
  ];

  constructor(private readonly http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return of(this.persons);
    // return this.http.get<Person[]>(this.url).pipe(map((persons) => persons));
  }

  getPerson(id: number) { }

  editPerson(id: number) { }

  deletePerson(id: number) { }
}
