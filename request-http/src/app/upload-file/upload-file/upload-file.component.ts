import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  files: Set<File>;
  private uploadSubscription: Subscription;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if(this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    };    
  }

  onChange(event) {
    console.log(event);

    const selectedFile = <FileList>event.srcElement.files;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFile.length; i++) {
      fileNames.push(selectedFile[i].name);
      this.files.add(selectedFile[i]);
    }

    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
  }

  onUpload() {
    if(this.files && this.files.size > 0) {
      this.uploadSubscription = this.service.upload(this.files, `${environment.API}/upload`)
        .subscribe(
          response => console.log('upload Concluido')
        ); 
    };
  }
}
