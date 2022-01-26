import { TaskModel } from './../models/task.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const servUrl = 'https://localhost:44377/api/Task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private readonly http: HttpClient) { }

    add(item: TaskModel) {
        return this.http.post(servUrl, item);
    }

    delete(id: number) {
        return this.http.delete(`${servUrl}/${id}`);
    }

    getAll() {
        return this.http.get<TaskModel[]>(servUrl);
    }

    getById(id?: number) {
        return this.http.get<TaskModel>(`${servUrl}/${id}`);
    }

    update(item: TaskModel) {
        return this.http.put(servUrl, item);
    }
}
