import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalType } from 'src/app/models/modal';
import { ModalService } from 'src/app/services/modal.service';
import { RefModalDirective } from 'src/app/directives/ref-modal.directive';

@Component({
  selector: 'app-person-container',
  templateUrl: './person-container.component.html',
  styleUrls: ['./person-container.component.scss'],
  providers: [ModalService, RefModalDirective],
})
export class PersonContainerComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject();

  persons: Person[] = [];

  constructor(
    private readonly personService: PersonService,
    private readonly modalService: ModalService,
  ) {}

  ngOnInit(): void {    
    this.personService.getPersons()
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(persons => this.persons = persons);
  }

  addPerson(): void { 
    const modal = this.modalService.openModal(ModalType.add);

    modal.onClick.subscribe((person) => {
      this.personService.addPerson({
        id: this.persons.length + 1,
        ...person
      }).pipe(
        takeUntil(this.destroyed$)
      ).subscribe(person => this.persons.push(person));
    });
  }

  editPerson(person: Person) {
    const modal = this.modalService.openModal(ModalType.edit, person);

    modal.onClick.subscribe((person) => {      
      this.personService.editPerson(person).pipe(
        takeUntil(this.destroyed$)
      ).subscribe(person => {
        const updatedPersonIndex = this.persons.findIndex(p => p.id === person.id);
        this.persons[updatedPersonIndex] = {...person}
      });
    });
  }

  removePerson(person: Person) {
    const modal = this.modalService.openModal(ModalType.remove, person);    

    modal.onClick.subscribe(() => {
      this.personService.removePerson(person)
        .subscribe(() => this.persons = this.persons.filter(item => item !== person));
    });    
  }

  ngOnDestroy(): void { 
    this.destroyed$.next;
  }
}
