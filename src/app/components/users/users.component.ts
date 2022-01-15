import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: UserModel[] = [];

  gridColDefs: ColDef[] = [
    { headerName: 'User ID', field: 'ID_USER' },
    { headerName: 'Email', field: 'EMAIL' },
    { headerName: 'First Name', field: 'FIRST_NAME' },
    { headerName: 'Last Name', field: 'LAST_NAME' }
  ];

  ngOnInit(): void {
    this.userList = [
      { ID_USER: 1, EMAIL: 'john.doe@test.com', FIRST_NAME: 'John', LAST_NAME: 'Doe' },
      { ID_USER: 2, EMAIL: 'john.skeet@test.com', FIRST_NAME: 'John', LAST_NAME: 'Skeet' },
      { ID_USER: 3, EMAIL: 'mark.seeman@test.com', FIRST_NAME: 'Mark', LAST_NAME: 'Seeman' },
      { ID_USER: 4, EMAIL: 'bob.martin@test.com', FIRST_NAME: 'Bob', LAST_NAME: 'Martin' }
    ];
  }

}
