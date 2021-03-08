import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiUserService } from '../../../services/api-user.service';
import { DataUserAll } from 'src/app/interface/data-user';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {
  @Input()
  user: DataUserAll[];
  //fileToUpload: File = null;
  myFiles: string[] = [];
  formData = new FormData();
  formModel: FormGroup;
  constructor(private apiUserService: ApiUserService) {
    const fb = new FormBuilder();
    this.formModel = fb.group({
      file: [null, Validators.required],
      user_id: [null, Validators.required],
    })

  }
  handleFileInput(event) {
    this.formData.delete("userId");
    console.log(event.target.files.length);
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      this.formData.append('fieldname', event.target.files[i]);
    }
  }

  createOrUpdatePolicy() {
    //отправляем файл
    if (this.formModel.valid) {
      if (this.formData) {
        this.formData.append("userId", this.formModel.controls.user_id.value);
        this.apiUserService.postFile(this.formData).subscribe(response => {
          this.formModelReset();
        }, error => {
          console.log(error);
        });
      }
    }
  }

  formModelReset() {
    this.formModel.reset();
    this.formData.delete("userId");
    this.formData.delete("fieldname");
    this.myFiles.splice(0, this.myFiles.length)
  }

}
