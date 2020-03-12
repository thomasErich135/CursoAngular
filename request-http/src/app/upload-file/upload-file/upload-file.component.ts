import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event) {
    console.log(event);

    const selectedFile = <FileList>event.srcElement.files;

    const fileNames = [];
    for(let i = 0; i < selectedFile.length; i++){
      fileNames.push(selectedFile[i].name);
    }

    document.getElementById('customFileLabel').innerHTML =fileNames.join(', ');
  }

}
