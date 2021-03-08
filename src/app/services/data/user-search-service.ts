import { Injectable } from '@angular/core';
import { DataUser } from 'src/app/interface/data-user';
import { DataFile } from 'src/app/interface/data-file';
import { ApiUserService } from '../api-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  user_file: DataFile[];
  error: string;
  constructor(private apiUserService: ApiUserService) {
  }

  getUserFile(userFormModel: DataUser) {

    this.apiUserService.postUser(userFormModel).subscribe(data => {

      if (data.result === 'error') {
        this.error = data.msg;
        return this.error;
      }
      this.user_file = JSON.parse(data.msg);
      return this.user_file;

    });
  }
}

