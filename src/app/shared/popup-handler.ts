import { TaskModel } from './../models/task.model';
import { ProjectModel } from './../models/project.model';
import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PopupHandler {
    private readonly _userEntrySubject = new Subject<UserModel>();
    private readonly _projectEntrySubject = new Subject<ProjectModel>();
    private readonly _taskEntrySubject = new Subject<TaskModel>();

    openUserEntry(user: UserModel) {
        this._userEntrySubject.next(user);
    }

    userEntry() {
        return this._userEntrySubject.asObservable();
    }

    openProjectEntry(project: ProjectModel) {
        this._projectEntrySubject.next(project);
    }

    projectEntry() {
        return this._projectEntrySubject.asObservable();
    }

    openTaskEntry(task: TaskModel) {
        this._taskEntrySubject.next(task);
    }

    taskEntry() {
        return this._taskEntrySubject.asObservable();
    }
}
