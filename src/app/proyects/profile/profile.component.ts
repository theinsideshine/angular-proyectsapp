import { Component, OnInit,Input } from '@angular/core';
import { Proyect } from '../proyect';
import { ProyectService } from '../proyect.service';
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
              'Video Eliminada!',
              `Video ${video.description} eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

  

}
/*
<!--
                  <div *ngIf="authService.hasRole('ROLE_ADMIN')" class="input-group mb-3">
                    <div class="custom-file">
                      <input (change)="selectImagen($event)" type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04">
                      <label class="custom-file-label" for="inputGroupFile04">Seleccionar imagen</label>
                    </div>
                    <div class="input-group-append">
                      <button (click)="uploadImage()" [disabled]="!imageSelect" class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Subir</button>
                    </div>
                  </div>
    
                  <div *ngIf="progress > 0" class="progress" style="height: 40px;">
                    <div class="progress-bar progress-bar-striped" role="progressbar" [ngStyle]="{width:progress+'%'}" attr.aria-valuenow="{{progress}}" aria-valuemin="0" aria-valuemax="100">
                      {{progress}}%
                    </div>
                  </div>
                
                </div>
    
                <div class="col-sm">
                  <img *ngIf="proyect?.image" src="http://localhost:8080/api/uploads/img/{{proyect.image}}" alt="{{proyect.image}}" class="img-thumbnail rounded">
                </div>
              </div>-->
*/