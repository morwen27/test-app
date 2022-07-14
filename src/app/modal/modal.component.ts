import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modal, ModalType } from '../models/modal';
import { Person } from '../models/person';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('firstInput') firstInput!: ElementRef;

  options: Modal = {
    modal: '',
    button: '',
    person: undefined,
    type: undefined
  }   

  @Output() onClick = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<any>();

  personForm!: FormGroup;
  isAddType!: boolean;

  @HostListener('document:keydown.escape')
  onEscHandler() {
    this.onClose.emit();    
  }

  onSubmit(formValues: Person) { 
    this.onClick.emit({
      id: this.options.person?.id,
      ...formValues
    });
    if (!this.isAddType) { 
      this.onClose.emit();
    }
    this.personForm.reset();
    this.firstInput.nativeElement.focus();
  }

  ngOnInit() {     
    this.personForm = new FormGroup({
      firstName: new FormControl(
        this.options.person ?
          this.options.person.firstName : '',
        Validators.required),
      lastName: new FormControl(
        this.options.person ?
          this.options.person.lastName : '',
        Validators.required),
    });
    
    this.isAddType = this.options.type === ModalType.add;
  }

  ngAfterViewInit() {
    if (this.options.type !== ModalType.remove) { 
      this.firstInput.nativeElement.focus()
    }    
  }
}
