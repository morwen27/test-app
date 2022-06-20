import { Component, EventEmitter, AfterViewChecked, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modal } from '../models/modal';
import { Person } from '../models/person';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  options: Modal = {
    modal: '',
    button: '',
    person: undefined
  }   

  @Output() onClick = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<any>();

  personForm!: FormGroup; 

  onSubmit(formValues: Person) { 
    this.onClick.emit({
      id: this.options.person?.id,
      ...formValues
    });
    this.personForm.reset();
  }

  ngOnInit() {     
    this.personForm = new FormGroup({
      firstName: new FormControl(this.options.person ? this.options.person.firstName : '', Validators.required),
      lastName: new FormControl(this.options.person ? this.options.person.lastName : '', Validators.required),
    });    
  }
}
