import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiUserService } from '../../../services/api-user.service';
import { UserSearchService } from '../../../services/data/user-search-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  userFormModel: FormGroup;

  statusLabel = ['lead', 'client', 'demo'];

  constructor(private apiUserService: ApiUserService, private apiUserSearchService: UserSearchService) {
    const fb = new FormBuilder();
    this.userFormModel = fb.group({
      firstName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, [Validators.required]],
      status: [null, [Validators.required]],
    })

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.userFormModel.controls[controlName].hasError(errorName);
  }

  onSearchUser() {
    this.apiUserSearchService.getUserFile(this.userFormModel.value);
  }

  formModelReset() {
    this.userFormModel.reset();
  }
}

