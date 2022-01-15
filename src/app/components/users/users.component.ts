import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: UserModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.userList = [
      { ID_USER: 1, EMAIL: 'john.doe@test.com', FIRST_NAME: 'John', LAST_NAME: 'Doe' },
      { ID_USER: 2, EMAIL: 'john.skeet@test.com', FIRST_NAME: 'John', LAST_NAME: 'Skeet' },
      { ID_USER: 3, EMAIL: 'mark.seeman@test.com', FIRST_NAME: 'Mark', LAST_NAME: 'Seeman' },
      { ID_USER: 4, EMAIL: 'bob.martin@test.com', FIRST_NAME: 'Bob', LAST_NAME: 'Martin' }
    ];
  }

}
