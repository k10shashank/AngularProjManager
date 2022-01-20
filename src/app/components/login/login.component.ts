import { Component, OnInit, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor(private readonly cd: ChangeDetectorRef) { }

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
    } else if (this.email === 'admin@test.com' && this.password === 'admin') {
      this.onClose.emit(true);
    } else {
      this.errorMsg = 'Wrong Credentials';
      this.onClose.emit(false);
    }
    this.cd.markForCheck();
  }

}
