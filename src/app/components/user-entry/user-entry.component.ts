import { ErrorModel } from './../../models/error.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { UserModel } from './../../models/user.model';
import { PopupHandler } from './../../shared/popup-handler';
import { ChangeDetectorRef, Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.scss']
})
export class UserEntryComponent implements OnInit {
  @ViewChild('entryForm') entryForm!: NgForm;
  @Output() onClose = new EventEmitter();
  showComponentFlag!: boolean;
  formData: UserModel = { ID_USER: 0, EMAIL: '', FIRST_NAME: '', LAST_NAME: '' };
  legend!: string;
  errorMsg!: string;

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly popupHandler: PopupHandler,
    private readonly userService: UserService) { }

  ngOnInit(): void {
    this.popupHandler.userEntry().subscribe((user: UserModel) => {
      this.showComponentFlag = true;
      if (user.EMAIL === '') {
        this.legend = 'Add';
      } else {
        this.legend = 'Edit';
      }
      this.formData = user;
      this.cd.markForCheck();
    });
  }

  onSubmit() {
    if (this.formData.EMAIL === '') {
      this.errorMsg = 'Please enter Email';
    } else if (this.formData.FIRST_NAME === '') {
      this.errorMsg = 'Please enter First Name';
    } else if (this.formData.LAST_NAME === '') {
      this.errorMsg = 'Please enter Last Name';
    } else {
      switch (this.legend) {
        case 'Add':
          this.userService.add(this.formData).subscribe({
            next: () => this.onHttpSuccess(),
            error: (httpError: HttpErrorResponse) => this.onHttpError(httpError)
          });
          break;
        case 'Edit':
          this.userService.update(this.formData).subscribe({
            next: () => this.onHttpSuccess(),
            error: (httpError: HttpErrorResponse) => this.onHttpError(httpError)
          });
          break;
        default:
          break;
      }
    }
    this.cd.markForCheck();
  }

  onCloseDialog() {
    this.formData = { ID_USER: 0, EMAIL: '', FIRST_NAME: '', LAST_NAME: '' };
    this.legend = '';
    this.errorMsg = '';
    this.entryForm.reset();
    this.showComponentFlag = false;
    this.cd.markForCheck();
  }

  onHttpSuccess() {
    this.onCloseDialog();
    this.onClose.emit(true);
  }

  onHttpError(httpError: HttpErrorResponse) {
    const errorModel = httpError.error as ErrorModel;
    this.errorMsg = errorModel.ERROR_MSG;
    this.onCloseDialog();
    this.onClose.emit(false);
  }

}
