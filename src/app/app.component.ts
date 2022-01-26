import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularProjManager';
  user!: string;
  loginFlag = true;

  constructor(private readonly cd: ChangeDetectorRef) { }

  onLogin(username: string) {
    if (username === '') {
      this.loginFlag = true;
    } else {
      this.user = username;
      this.loginFlag = false;
    }
    this.cd.markForCheck();
  }

  onLogOut() {
    this.loginFlag = true;
    this.cd.markForCheck();
  }
}
