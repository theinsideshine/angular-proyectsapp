import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AppComponent } from './app.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { ProyectService } from './proyects/proyect.service';
import { FormComponent } from './proyects/form.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', redirectTo: '/proyects', pathMatch: 'full'},
  {path: 'proyects', component: ProyectsComponent},
  {path: 'proyects/form', component: FormComponent},
  {path: 'proyects/form/:id', component: FormComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProyectsComponent,
    FormComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ ProyectService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
