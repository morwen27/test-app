import { Injectable } from '@angular/core';
import { RefModalDirective } from '../directives/ref-modal.directive';
import { ModalComponent } from '../modal/modal.component';
import { Modal } from '../models/modal';

@Injectable()
export class ModalService {

  constructor(
    private readonly modalDirective: RefModalDirective,
  ) { }

  openModal(options: Modal): ModalComponent {     
        this.modalDirective.containerRef.clear();
  
        const modal = this.modalDirective.containerRef.createComponent(ModalComponent);
        modal.instance.options = options;
        
        modal.instance.onClose.subscribe(() => {
          this.modalDirective.containerRef.clear();
        });

        return modal.instance
      }    
}
