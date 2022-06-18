import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-person-container',
  templateUrl: './person-container.component.html',
  styleUrls: ['./person-container.component.scss'],
})
export class PersonContainerComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject();

  persons: Person[] = [];

  constructor(private readonly personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPersons()
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(persons => this.persons = persons);
  }

  editPerson(person: Person) {
    this.personService.editPerson(person);
  }

  removePerson(person: Person) {
    this.personService.removePerson(person)
      .subscribe(() => this.persons = this.persons.filter(item => item !== person));
  }

  ngOnDestroy(): void { 
    this.destroyed$.next;
  }
}
