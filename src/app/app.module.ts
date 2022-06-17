import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AppComponent } from './app.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { ProyectService } from './proyects/proyect.service';

const routes: Routes = [
  {path: '', redirectTo: '/proyects', pathMatch: 'full'},
  {path: 'proyects', component: ProyectsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProyectsComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)

  ],
  providers: [ ProyectService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
