import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiUserService } from '../../services/api-user.service';
import { DataUserAll } from 'src/app/interface/data-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  displayedColumns: string[] = ['id', 'last_name','first_name', 'birth_date', 'email', 'registration_date', 'status', 'ip_adress'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  userAll: MatTableDataSource<DataUserAll>;
  userService:DataUserAll[];
  
  constructor(private apiUserService: ApiUserService) {
   }

  ngOnInit() {
    this.apiUserService.getUserAll().subscribe(data => {
      this.userService = data;
      this.userAll = new MatTableDataSource<DataUserAll>(data);
      this.userAll.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
  }
}