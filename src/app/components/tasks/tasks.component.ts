import { PopupHandler } from './../../shared/popup-handler';
import { UserModel } from './../../models/user.model';
import { ProjectModel } from './../../models/project.model';
import { TaskModel } from './../../models/task.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { dateCellRenderer } from '../../shared/cell-renderer-functions';
import { stringifyProjectModel, stringifyUserModel } from '../../shared/app-functions';

const cnstTaskDetail = 'This is a Test Task';
const cnstTaskDate = '17-NOV-2021';
const cnstProjectDetail = 'This is a Test Project';
const cnstProjectDate = '17-NOV-2021';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  userList: UserModel[] = [
    { ID_USER: 1, EMAIL: 'john.doe@test.com', FIRST_NAME: 'John', LAST_NAME: 'Doe' },
    { ID_USER: 2, EMAIL: 'john.skeet@test.com', FIRST_NAME: 'John', LAST_NAME: 'Skeet' },
    { ID_USER: 3, EMAIL: 'mark.seeman@test.com', FIRST_NAME: 'Mark', LAST_NAME: 'Seeman' },
    { ID_USER: 4, EMAIL: 'bob.martin@test.com', FIRST_NAME: 'Bob', LAST_NAME: 'Martin' }
  ];
  projectList: ProjectModel[] = [
    { ID_PROJECT: 1, NAME: 'Project1', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) },
    { ID_PROJECT: 2, NAME: 'Project2', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) },
    { ID_PROJECT: 3, NAME: 'Project3', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) },
    { ID_PROJECT: 4, NAME: 'Project4', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) }
  ];
  taskList: TaskModel[] = [];

  gridColDefs: ColDef[] = [
    { headerName: 'Task ID', field: 'ID_TASK', width: 100 },
    { headerName: 'Details', field: 'DETAILS', width: 150 },
    { headerName: 'Status', field: 'STATUS', width: 150 },
    { headerName: 'Created On', field: 'CREATED_ON', cellRenderer: params => dateCellRenderer(new Date(params.value)), width: 200 },
    { headerName: 'Project', cellRenderer: params => stringifyProjectModel(params.data.PROJECT), width: 400 },
    { headerName: 'User', cellRenderer: params => stringifyUserModel(params.data.USER), width: 300 },
    { cellRenderer: () => `<button class="btn btn-primary">Edit Task</button>`, onCellClicked: params => this.popupHandler.openTaskEntry(params.data), width: 100 },
    { cellRenderer: () => `<button class="btn btn-primary">Delete Task</button>`, width: 150 }
  ];

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly popupHandler: PopupHandler) { }

  ngOnInit(): void {
    this.taskList = [
      {
        ID_TASK: 1, DETAILS: cnstTaskDetail, CREATED_ON: new Date(cnstTaskDate), STATUS: 'New', ID_PROJECT: 1, ID_USER: 1,
        PROJECT: this.projectList[0], USER: this.userList[0]
      },
      {
        ID_TASK: 2, DETAILS: cnstTaskDetail, CREATED_ON: new Date(cnstTaskDate), STATUS: 'InProgress', ID_PROJECT: 2, ID_USER: 1,
        PROJECT: this.projectList[1], USER: this.userList[0]
      },
      {
        ID_TASK: 3, DETAILS: cnstTaskDetail, CREATED_ON: new Date(cnstTaskDate), STATUS: 'QA', ID_PROJECT: 3, ID_USER: 3,
        PROJECT: this.projectList[2], USER: this.userList[2]
      },
      {
        ID_TASK: 4, DETAILS: cnstTaskDetail, CREATED_ON: new Date(cnstTaskDate), STATUS: 'InProgress', ID_PROJECT: 2, ID_USER: 4,
        PROJECT: this.projectList[1], USER: this.userList[3]
      },
      {
        ID_TASK: 5, DETAILS: cnstTaskDetail, CREATED_ON: new Date(cnstTaskDate), STATUS: 'QA', ID_PROJECT: 3, ID_USER: 3,
        PROJECT: this.projectList[2], USER: this.userList[2]
      },
      {
        ID_TASK: 6, DETAILS: cnstTaskDetail, CREATED_ON: new Date(cnstTaskDate), STATUS: 'Completed', ID_PROJECT: 4, ID_USER: 2,
        PROJECT: this.projectList[3], USER: this.userList[1]
      }
    ];
  }

  openTaskEntryDialog() {
    const maxTaskId = Math.max(...this.taskList.map(x => x.ID_TASK));
    const addTask: TaskModel = {
      ID_TASK: maxTaskId + 1, DETAILS: '', CREATED_ON: new Date(), STATUS: 'New', ID_PROJECT: 0, ID_USER: 0,
      PROJECT: { ID_PROJECT: 0, NAME: '', DETAILS: '', CREATED_ON: new Date() }, USER: { ID_USER: 0, EMAIL: '', FIRST_NAME: '', LAST_NAME: '' }
    };
    this.popupHandler.openTaskEntry(addTask);
    this.cd.markForCheck();
  }

}
