import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from '../users/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
 title: string = 'Proyects List Viewer';

 constructor(public authService: AuthService, private router: Router) { }
  logout(): void {
    let username = this.authService.user.username;
    this.authService.logout();
    swal('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }
}