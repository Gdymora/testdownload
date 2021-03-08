import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiUserService } from '../../../services/api-user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent {
  userFormModel: FormGroup;

  statusLabel = ['lead', 'client', 'demo'];

  constructor(private apiUserService: ApiUserService) {
    const fb = new FormBuilder();
    this.userFormModel = fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, [Validators.required]],
      status: [null, [Validators.required]],
    })

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.userFormModel.controls[controlName].hasError(errorName);
  }


  onCreateUser() {
    this.apiUserService.putUser(this.userFormModel.value).subscribe(data => {
      //todo
    });
  }

  formModelReset() {
    this.userFormModel.reset();
  }
}

