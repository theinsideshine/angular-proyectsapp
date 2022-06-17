import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AppComponent } from './app.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { ProyectService } from './proyects/proyect.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProyectsComponent

  ],
  imports: [
    BrowserModule
  ],
  providers: [ ProyectService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
