import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonComponent } from './persons/component/person.component';
import { PersonContainerComponent } from './persons/container/person-container.component';
import { PersonService } from './services/person.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonContainerComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
