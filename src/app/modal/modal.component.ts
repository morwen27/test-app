import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal } from '../models/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() titles: Modal = {
    modal: '',
    button: '',
  }

  @Output() onClick = new EventEmitter<any>();
}
