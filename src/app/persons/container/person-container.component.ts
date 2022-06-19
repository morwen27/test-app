import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef,  } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';
import { RefModalDirective } from 'src/app/directives/ref-modal.directive';

@Component({
  selector: 'app-person-container',
  templateUrl: './person-container.component.html',
  styleUrls: ['./person-container.component.scss'],
})
export class PersonContainerComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject();

  @ViewChild(RefModalDirective) private viewRefModal: RefModalDirective | undefined;

  persons: Person[] = [];

  constructor(private readonly personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPersons()
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(persons => this.persons = persons);
  }

  addPerson(): void { 
    if (this.viewRefModal) { 
      this.viewRefModal.containerRef.clear();
      const modal = this.viewRefModal.containerRef.createComponent(ModalComponent);
      modal.instance.titles = {
        modal: 'Добавить сотрудника',
        button: 'Добавить'
      }
      modal.instance.onClick.subscribe(() => {
        console.log(this.viewRefModal);
        
        if (this.viewRefModal) this.viewRefModal.containerRef.clear();
      });
    }
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
