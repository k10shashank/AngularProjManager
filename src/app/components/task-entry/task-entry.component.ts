import { ErrorModel } from './../../models/error.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskService } from './../../services/task.service';
import { objectifyProjectModel, objectifyUserModel, stringifyProjectModel, stringifyUserModel } from '../../shared/app-functions';
import { UserModel } from './../../models/user.model';
import { PopupHandler } from './../../shared/popup-handler';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../..//models/task.model';
import { ProjectModel } from '../../models/project.model';

@Component({
  selector: 'app-task-entry',
  templateUrl: './task-entry.component.html',
  styleUrls: ['./task-entry.component.scss']
})
export class TaskEntryComponent implements OnInit {
  @ViewChild('entryForm') entryForm!: NgForm;
  @Input() userList: UserModel[] = [];
  @Input() projectList: ProjectModel[] = [];
  @Output() onClose = new EventEmitter();

  projectSelectList: string[] = [];
  projectSelected!: string;

  userSelectList: string[] = [];
  userSelected!: string;

  statusSelectList: string[] = ['New', 'InProgress', 'QA', 'Completed'];
  statusSelected!: string;

  showComponentFlag!: boolean;
  formData: TaskModel = {
    ID_TASK: 0, DETAILS: '', CREATED_ON: new Date(), STATUS: 'New', ID_PROJECT: 0, ID_USER: 0,
    PROJECT: { ID_PROJECT: 0, NAME: '', DETAILS: '', CREATED_ON: new Date() }, USER: { ID_USER: 0, EMAIL: '', FIRST_NAME: '', LAST_NAME: '' }
  };
  legend!: string;
  errorMsg!: string;

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly popupHandler: PopupHandler,
    private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.popupHandler.taskEntry().subscribe((task: TaskModel) => {
      this.showComponentFlag = true;
      if (task.DETAILS === '') {
        this.legend = 'Add';
      } else {
        this.legend = 'Edit';
      }
      this.formData = task;

      this.projectSelectList = this.projectList.map(x => stringifyProjectModel(x));
      this.projectSelected = stringifyProjectModel(task.PROJECT);

      this.userSelectList = this.userList.map(x => stringifyUserModel(x));
      this.userSelected = stringifyUserModel(task.USER);

      this.statusSelected = task.STATUS;

      this.cd.markForCheck();
    });
  }

  onSubmit() {
    if (this.formData.DETAILS === '') {
      this.errorMsg = 'Please enter Details';
    } else if (this.formData.PROJECT.ID_PROJECT === 0) {
      this.errorMsg = 'Please enter Project Details';
    } else if (this.formData.USER.ID_USER === 0) {
      this.errorMsg = 'Please enter User Details';
    } else {
      switch (this.legend) {
        case 'Add':
          this.taskService.add(this.formData).subscribe({
            next: () => this.onHttpSuccess(),
            error: (httpError: HttpErrorResponse) => this.onHttpError(httpError)
          });
          break;
        case 'Edit':
          this.taskService.update(this.formData).subscribe({
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
    this.formData = {
      ID_TASK: 0, DETAILS: '', CREATED_ON: new Date(), STATUS: 'New', ID_PROJECT: 0, ID_USER: 0,
      PROJECT: { ID_PROJECT: 0, NAME: '', DETAILS: '', CREATED_ON: new Date() }, USER: { ID_USER: 0, EMAIL: '', FIRST_NAME: '', LAST_NAME: '' }
    };
    this.legend = '';
    this.errorMsg = '';
    this.entryForm.reset();
    this.showComponentFlag = false;

    this.projectSelectList = [];
    this.projectSelected = '';
    this.userSelectList = [];
    this.userSelected = '';
    this.statusSelected = '';

    this.cd.markForCheck();
  }

  onProjectSelect() {
    const project: ProjectModel = objectifyProjectModel(this.projectSelected);
    this.formData.ID_PROJECT = project.ID_PROJECT;
    this.formData.PROJECT = project;
    this.cd.markForCheck();
  }

  onUserSelect() {
    const user: UserModel = objectifyUserModel(this.userSelected);
    this.formData.ID_USER = user.ID_USER;
    this.formData.USER = user;
    this.cd.markForCheck();
  }

  onStatusSelect() {
    this.formData.STATUS = this.statusSelected;
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
