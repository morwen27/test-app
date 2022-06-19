import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef,  } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';
import { RefModalDirective } from 'src/app/directives/ref-modal.directive';
import { Modal } from 'src/app/models/modal';

@Component({
  selector: 'app-person-container',
  templateUrl: './person-container.component.html',
  styleUrls: ['./person-container.component.scss'],
})
export class PersonContainerComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject();

  @ViewChild(RefModalDirective) private viewRefModal!: RefModalDirective;
  private modal!: ComponentRef<ModalComponent>;

  persons: Person[] = [];

  constructor(
    private readonly personService: PersonService
  ) {}

  ngOnInit(): void {
    this.personService.getPersons()
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(persons => this.persons = persons);
  }

  addPerson(): void { 
    this.openModal({
      modal: 'Добавление сотрудника',
      button: 'Добавить'
    });

    this.modal.instance.onClick.subscribe((person) => {
      this.personService.addPerson({
        id: this.persons.length + 1,
        ...person
      }).pipe(
        takeUntil(this.destroyed$)
      ).subscribe(person => this.persons.push(person));
    });
  }

  editPerson(person: Person) {
    this.openModal({
      modal: 'Изменение данных сотрудника',
      button: 'Изменить',
      person: person
    });
    this.modal.instance.onClick.subscribe((person) => {      
      this.personService.editPerson(person).pipe(
        takeUntil(this.destroyed$)
      ).subscribe(person => {
        const updatedPersonIndex = this.persons.findIndex(p => p.id === person.id);
        this.persons[updatedPersonIndex] = {...person}
      });
    });
  }

  removePerson(person: Person) {
    this.openModal({
      modal: 'Удаление сотрудника',
      button: 'Удалить',
      person: person
    });
    this.modal.instance.onClick.subscribe(() => {
      this.personService.removePerson(person)
        .subscribe(() => this.persons = this.persons.filter(item => item !== person));
    });    
  }

  openModal(options: Modal) { 
    if (this.viewRefModal) {
      this.viewRefModal.containerRef.clear();

      this.modal = this.viewRefModal.containerRef.createComponent(ModalComponent);
      this.modal.instance.options = options;
      
      this.modal.instance.onClose.subscribe(() => {
        if (this.viewRefModal) this.viewRefModal.containerRef.clear();
      });
    }
  }

  ngOnDestroy(): void { 
    this.destroyed$.next;
  }
}
