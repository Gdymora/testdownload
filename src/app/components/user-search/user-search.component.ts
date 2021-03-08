import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserSearchService } from '../../services/data/user-search-service';
import { ApiUserService } from '../../services/api-user.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataFile } from 'src/app/interface/data-file';
import { dateFormat } from '../../libre/format';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})

export class UserSearchComponent implements OnInit {
  displayedColumns: string[] = ['id', 'file_name', 'original_name', 'mime',
    'size', 'destination', 'user_id', 'date_create', 'download', 'view'];

  @ViewChild('id') id: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userAll: MatTableDataSource<DataFile>;
  userService: DataFile[];
  userFile: UserSearchService;
  vievimage: any;

  constructor(private apiUserSearchService: UserSearchService, private apiUserService: ApiUserService) {
    this.userFile = apiUserSearchService;
  }

  dateFormat(date: string) {
    return dateFormat(date, 'T');
  }

  ngOnInit() {

    this.userAll = new MatTableDataSource(this.userFile.user_file);
    this.userAll.paginator = this.paginator;
  }

  showId(file_id: number) {
    const user_file = this.userFile.user_file.filter(item => item.id === file_id);
    this.apiUserService.postgetFile(user_file[0]).subscribe(data => {
      console.log(data);
      this.createImageView(data);
      const file = new Blob([data], { type: data.type });
      let url = window.URL.createObjectURL(file);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = user_file[0].original_name;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      if (data.result === 'error') {
        console.log(data.result);
      }
      console.log(data);
    });
  }

  viewId(file_id: number) {
    const user_file = this.userFile.user_file.filter(item => item.id === file_id);
    this.apiUserService.postgetFile(user_file[0]).subscribe(data => {
      this.createImageView(data);
      if (data.result === 'error') {
        console.log(data);
      }
    });
  }

  createImageView(image: Blob) {

    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.vievimage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
