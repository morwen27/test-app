import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    RefModalDirective
  ],
  imports: [
    BrowserModule, HttpClientModule
  ], 
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
