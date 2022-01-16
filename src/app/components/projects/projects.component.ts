import { PopupHandler } from './../../shared/popup-handler';
import { ProjectModel } from './../../models/project.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { dateCellRenderer } from '../../shared/cell-renderer-functions';

const cnstProjectDetail = 'This is a Test Project';
const cnstProjectDate = '17-NOV-2021';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectList: ProjectModel[] = [];

  gridColDefs: ColDef[] = [
    { headerName: 'Project ID', field: 'ID_PROJECT', width: 100 },
    { headerName: 'Name', field: 'NAME', width: 150 },
    { headerName: 'Details', field: 'DETAILS', width: 200 },
    { headerName: 'Created On', field: 'CREATED_ON', cellRenderer: params => dateCellRenderer(new Date(params.value)), width: 200 },
    { cellRenderer: () => `<button class="btn btn-primary">Edit Project</button>`, onCellClicked: params => this.popupHandler.openProjectEntry(params.data), width: 100 },
    { cellRenderer: () => `<button class="btn btn-primary">Delete Project</button>`, width: 150 }
  ];

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly popupHandler: PopupHandler) { }

  ngOnInit(): void {
    this.projectList = [
      { ID_PROJECT: 1, NAME: 'Project1', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) },
      { ID_PROJECT: 2, NAME: 'Project2', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) },
      { ID_PROJECT: 3, NAME: 'Project3', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) },
      { ID_PROJECT: 4, NAME: 'Project4', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) }
    ];
  }

  openProjectEntryDialog() {
    const maxProjectId = Math.max(...this.projectList.map(x => x.ID_PROJECT));
    const addProject: ProjectModel = { ID_PROJECT: maxProjectId + 1, NAME: '', DETAILS: '', CREATED_ON: new Date() };
    this.popupHandler.openProjectEntry(addProject);
    this.cd.markForCheck();
  }

}
