import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const servUrl = 'https://localhost:44377/api/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private readonly http: HttpClient) { }

    add(item: UserModel) {
        return this.http.post(servUrl, item);
    }

    delete(id: number) {
        return this.http.delete(`${servUrl}/${id}`);
    }

    getAll() {
        return this.http.get<UserModel[]>(servUrl);
    }

    getById(id?: number) {
        return this.http.get<UserModel>(`${servUrl}/${id}`);
    }

    update(item: UserModel) {
        return this.http.put(servUrl, item);
    }
}
