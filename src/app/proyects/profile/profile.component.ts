import { Component, OnInit,Input } from '@angular/core';
import { Proyect } from '../proyect';
import { ProyectService } from '../proyect.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { Video } from '../../videos/models/video';
import { VideosService } from '../../videos/service/videos.service';

import swal from 'sweetalert2';
import { AuthService } from 'src/app/users/auth.service';

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
  public modalService: ModalService,
  public authService: AuthService,
  private videoService: VideosService) { }

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

  delete(video: Video): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el video ${video.description}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.videoService.delete(video.id).subscribe(
          () => {
            this.proyect.videos = this.proyect.videos.filter(f => f !== video)
            swal(
              'Factura Eliminada!',
              `Factura ${video.description} eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

  

}
