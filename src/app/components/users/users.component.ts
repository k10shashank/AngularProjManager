import { PopupHandler } from './../../shared/popup-handler';
import { UserModel } from './../../models/user.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: UserModel[] = [];

  gridColDefs: ColDef[] = [
    { headerName: 'User ID', field: 'ID_USER', width: 100 },
    { headerName: 'Email', field: 'EMAIL', width: 200 },
    { headerName: 'First Name', field: 'FIRST_NAME', width: 150 },
    { headerName: 'Last Name', field: 'LAST_NAME', width: 150 },
    { cellRenderer: () => `<button class="btn btn-primary">Edit User</button>`, onCellClicked: params => this.popupHandler.openUserEntry(params.data), width: 100 },
    { cellRenderer: () => `<button class="btn btn-primary">Delete User</button>`, width: 150 }
  ];

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly popupHandler: PopupHandler) { }

  ngOnInit(): void {
    this.userList = [
      { ID_USER: 1, EMAIL: 'john.doe@test.com', FIRST_NAME: 'John', LAST_NAME: 'Doe' },
      { ID_USER: 2, EMAIL: 'john.skeet@test.com', FIRST_NAME: 'John', LAST_NAME: 'Skeet' },
      { ID_USER: 3, EMAIL: 'mark.seeman@test.com', FIRST_NAME: 'Mark', LAST_NAME: 'Seeman' },
      { ID_USER: 4, EMAIL: 'bob.martin@test.com', FIRST_NAME: 'Bob', LAST_NAME: 'Martin' }
    ];
  }

  openUserEntryDialog() {
    const maxUserId = Math.max(...this.userList.map(x => x.ID_USER));
    const addUser: UserModel = { ID_USER: maxUserId + 1, EMAIL: '', FIRST_NAME: '', LAST_NAME: '' };
    this.popupHandler.openUserEntry(addUser);
    this.cd.markForCheck();
  }

}
