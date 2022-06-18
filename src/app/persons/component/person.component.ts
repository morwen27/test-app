import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  @Input() persons: Person[] | null = [];

  @Output() editingPerson: EventEmitter<Person> = new EventEmitter();
  @Output() removingPerson: EventEmitter<Person> = new EventEmitter();

  editPerson(person: Person) { 
    this.editingPerson.emit(person)
  }

  removePerson(person: Person) {
    this.removingPerson.emit(person)
  }
}
