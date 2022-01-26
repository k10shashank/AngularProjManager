import { UserPassModel, UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const servUrl = 'https://localhost:44377/api/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private readonly http: HttpClient) { }

  login(item: UserPassModel) {
    return this.http.post<UserModel>(servUrl, item);
  }
}
