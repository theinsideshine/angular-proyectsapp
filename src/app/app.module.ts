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
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './proyects/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/proyects', pathMatch: 'full'},
  {path: 'proyects', component: ProyectsComponent},
  {path: 'proyects/form', component: FormComponent},
  {path: 'proyects/form/:id', component: FormComponent},
  {path: 'proyects/page/:page', component: ProyectsComponent },
 

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProyectsComponent,
    FormComponent,
    PaginatorComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ ProyectService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
