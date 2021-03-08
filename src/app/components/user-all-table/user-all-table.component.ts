import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiUserService } from '../../services/api-user.service';
import { DataUserAll } from 'src/app/interface/data-user';
import { dateFormat, inetNtoa, dateFormatNotTime } from '../../libre/format';

@Component({
  selector: 'app-user-all-table',
  templateUrl: './user-all-table.component.html',
  styleUrls: ['./user-all-table.component.css']
})
export class UserAllTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'last_name', 'first_name', 'birth_date', 'email', 'registration_date', 'status', 'ip_adress'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  userAll: MatTableDataSource<DataUserAll>;
  userService: DataUserAll[];

  constructor(private apiUserService: ApiUserService) {
  }
  dateFormat(date:string){
    return dateFormat(date, 'T');
  }

  
  dateFormatNotTime(date: string) {
    return dateFormatNotTime(date, 'T');
  }

  inet_ntoa(num) {
    return inetNtoa(num);
  }

  ngOnInit() {
    this.apiUserService.getUserAll().subscribe(data => {
      this.userService = data;
      console.log(this.userService)
      this.userAll = new MatTableDataSource<DataUserAll>(data);
      this.userAll.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
  }
}
