import { UserService } from './../../services/user.service';
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
    { width: 150, cellRenderer: () => `<button class="btn btn-primary">Edit User</button>`, onCellClicked: params => this.popupHandler.openUserEntry(params.data) },
    {
      width: 150, cellRenderer: () => `<button class="btn btn-primary">Delete User</button>`,
      onCellClicked: params => this.userService.delete(params.data.ID_USER).subscribe({
        next: () => this.getAll()
      })
    }
  ];

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly popupHandler: PopupHandler,
    private readonly userService: UserService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userService.getAll().subscribe({
      next: data => {
        this.userList = data;
        this.cd.markForCheck();
      }
    });
  }

  openUserEntryDialog() {
    const maxUserId = Math.max(...this.userList.map(x => x.ID_USER));
    const addUser: UserModel = { ID_USER: maxUserId + 1, EMAIL: '', FIRST_NAME: '', LAST_NAME: '' };
    this.popupHandler.openUserEntry(addUser);
    this.cd.markForCheck();
  }

  onDialogClose(successFlag: boolean) {
    if (successFlag) {
      this.getAll();
    }
  }

}
