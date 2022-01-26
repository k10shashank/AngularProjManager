import { ProjectModel } from './../models/project.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const servUrl = 'https://localhost:44377/api/Project';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    constructor(private readonly http: HttpClient) { }

    add(item: ProjectModel) {
        return this.http.post(servUrl, item);
    }

    delete(id: number) {
        return this.http.delete(`${servUrl}/${id}`);
    }

    getAll() {
        return this.http.get<ProjectModel[]>(servUrl);
    }

    getById(id?: number) {
        return this.http.get<ProjectModel>(`${servUrl}/${id}`);
    }

    update(item: ProjectModel) {
        return this.http.put(servUrl, item);
    }
}
