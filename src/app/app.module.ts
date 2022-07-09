import { NgModule ,LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http'

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
import { LoginComponent } from './users/login.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

import { AuthGuard } from './users/guards/auth.guard';
import { RoleGuard } from './users/guards/role.guard';

import { TokenInterceptor } from './users/interceptors/token.interceptor';
import { AuthInterceptor } from './users/interceptors/auth.interceptor';
import { ProfileVideoComponent } from './videos/profile-video.component';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {path: '', redirectTo: '/proyects', pathMatch: 'full'},
  {path: 'proyects', component: ProyectsComponent},
  {path: 'proyects/form', component: FormComponent, canActivate: [AuthGuard,RoleGuard],data: { role: 'ROLE_ADMIN' }},
  {path: 'proyects/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_ADMIN' }},
  {path: 'proyects/page/:page', component: ProyectsComponent },
  {path: 'login', component: LoginComponent },
  {path: 'videos/:id', component: ProfileVideoComponent},
 

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProyectsComponent,
    FormComponent,
    PaginatorComponent,
    ProfileComponent,
    LoginComponent,
    ProfileVideoComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ProyectService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
