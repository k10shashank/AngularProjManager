import { TaskService } from './../../services/task.service';
import { ProjectService } from './../../services/project.service';
import { UserService } from './../../services/user.service';
import { PopupHandler } from './../../shared/popup-handler';
import { UserModel } from './../../models/user.model';
import { ProjectModel } from './../../models/project.model';
import { TaskModel } from './../../models/task.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { dateCellRenderer } from '../../shared/cell-renderer-functions';
import { stringifyProjectModel, stringifyUserModel } from '../../shared/app-functions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  userList: UserModel[] = [];
  projectList: ProjectModel[] = [];
  taskList: TaskModel[] = [];

  gridColDefs: ColDef[] = [
    { headerName: 'Task ID', field: 'ID_TASK', width: 100 },
    { headerName: 'Details', field: 'DETAILS', width: 150 },
    { headerName: 'Status', field: 'STATUS', width: 150 },
    { headerName: 'Created On', field: 'CREATED_ON', cellRenderer: params => dateCellRenderer(new Date(params.value)), width: 200 },
    { headerName: 'Project', cellRenderer: params => stringifyProjectModel(params.data.PROJECT), width: 400 },
    { headerName: 'User', cellRenderer: params => stringifyUserModel(params.data.USER), width: 300 },
    { width: 150, cellRenderer: () => `<button class="btn btn-primary">Edit Task</button>`, onCellClicked: params => this.popupHandler.openTaskEntry(params.data) },
    {
      width: 150, cellRenderer: () => `<button class="btn btn-primary">Delete Task</button>`,
      onCellClicked: params => this.taskService.delete(params.data.ID_TASK).subscribe({
        next: () => this.getAll()
      })
    }
  ];

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly popupHandler: PopupHandler,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userService.getAll().subscribe({
      next: data => {
        this.userList = data;
        this.cd.markForCheck();
      }
    });
    this.projectService.getAll().subscribe({
      next: data => {
        this.projectList = data;
        this.cd.markForCheck();
      }
    });
    this.taskService.getAll().subscribe({
      next: data => {
        this.taskList = data;
        this.cd.markForCheck();
      }
    });
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

  onDialogClose(successFlag: boolean) {
    if (successFlag) {
      this.getAll();
    }
  }

}
