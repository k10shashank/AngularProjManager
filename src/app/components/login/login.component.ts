import { ErrorModel } from './../../models/error.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('entryForm') loginForm!: NgForm;
  @Output() onClose = new EventEmitter();
  email!: string;
  password!: string;
  errorMsg!: string;

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly loginService: LoginService) { }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
    this.errorMsg = '';
  }

  onLogin() {
    if (this.email === '') {
      this.errorMsg = 'Please enter Email';
    } else if (this.password === '') {
      this.errorMsg = 'Please enter Password';
    } else {
      this.loginService.login({ EMAIL: this.email, PASSWORD: this.password })
        .subscribe({
          next: data => {
            this.errorMsg = '';
            this.onClose.emit(`${data.FIRST_NAME} ${data.LAST_NAME}`);
          }, error: (httpError: HttpErrorResponse) => {
            const errorModel = httpError.error as ErrorModel;
            this.errorMsg = errorModel.ERROR_MSG;
            this.onClose.emit('');
          }
        });
    }
    this.cd.markForCheck();
  }

}
