import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-person-container',
  templateUrl: './person-container.component.html',
  styleUrls: ['./person-container.component.scss'],
})
export class PersonContainerComponent {
  private readonly destoyed$ = new Subject();

  readonly persons$: Observable<Person[]> = this.personService
    .getPersons()
    .pipe(
      takeUntil(this.destoyed$),
      map((persons) => persons)
    );

  constructor(private readonly personService: PersonService) { }

  ngOnDestroy() {
    this.destoyed$.next;
  }
}
