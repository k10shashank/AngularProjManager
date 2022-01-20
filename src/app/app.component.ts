import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularProjManager';
  loginFlag = true;

  constructor(private readonly cd: ChangeDetectorRef) { }

  onLogin(loggedIn: boolean) {
    this.loginFlag = !loggedIn;
    this.cd.markForCheck();
  }

  onLogOut() {
    this.loginFlag = true;
    this.cd.markForCheck();
  }
}
