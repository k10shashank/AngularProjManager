import { UserModel } from './../../models/user.model';
import { ProjectModel } from './../../models/project.model';
import { TaskModel } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { dateCellRenderer } from '../../shared/app-functions';

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
    { headerName: 'Task ID', field: 'ID_TASK' },
    { headerName: 'Details', field: 'DETAILS' },
    { headerName: 'Status', field: 'STATUS' },
    { headerName: 'Created On', field: 'CREATED_ON', cellRenderer(params) { return dateCellRenderer(new Date(params.value)); } },
    { headerName: 'Project', field: 'PROJECT.NAME' },
    { headerName: 'User', cellRenderer(params) { return `${params.data.USER.FIRST_NAME} ${params.data.USER.LAST_NAME}`; } }
  ];

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

}
