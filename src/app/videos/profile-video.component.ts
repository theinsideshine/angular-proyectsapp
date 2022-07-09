import { Component, OnInit } from '@angular/core';
import { Video } from './models/video';
import { VideosService } from './service/videos.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-profile-video',
  templateUrl: './profile-video.component.html',
 
})
export class ProfileVideoComponent implements OnInit {

  video: Video;
  tittle: string = 'Video';

  constructor(private videoService: VideosService,
    private activatedRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    
    ) { }

   

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.videoService.getVideo(id).subscribe(video => this.video = video);
    });
  }

  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
    console.log(video);
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}


}
