import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonComponent } from './persons/component/person.component';
import { PersonContainerComponent } from './persons/container/person-container.component';
import { PersonService } from './services/person.service';
import { RefModalDirective } from './directives/ref-modal.directive';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonContainerComponent,
    PersonComponent,
    RefModalDirective,
    ModalComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule, FormsModule
  ], 
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
