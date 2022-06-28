import { Component, OnInit,Input } from '@angular/core';
import { Proyect } from '../proyect';
import { ProyectService } from '../proyect.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

import swal from 'sweetalert2';

@Component({
  selector: 'profile-proyect',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() proyect: Proyect;
  
  tittle: string = "Detalle del proyecto";
  public imageSelect: File;
  progress: number = 0

  constructor(private proyectService: ProyectService,
  public modalService: ModalService) { }

  ngOnInit() {}
  

  selectImagen(event) {
    this.imageSelect = event.target.files[0];
    this.progress = 0;
    console.log(this.imageSelect);
    if (this.imageSelect.type.indexOf('image') < 0) {
      swal('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.imageSelect = null;
    }
  }

  

  uploadImage() {

    if (!this.imageSelect) {
      swal('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.proyectService.uploadImage(this.imageSelect, this.proyect.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.proyect = response.proyect as Proyect;
            this.modalService.notificarUpload.emit(this.proyect);
            swal('La imagen se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

  closeModal() {
    this.modalService.closeModal();
    this.imageSelect = null;
    this.progress = 0;
  }

}
