import { ProjectModel } from './../../models/project.model';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { dateCellRenderer } from '../../shared/app-functions';

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
    { headerName: 'Project ID', field: 'ID_PROJECT' },
    { headerName: 'Name', field: 'NAME' },
    { headerName: 'Details', field: 'DETAILS' },
    { headerName: 'Created On', field: 'CREATED_ON', cellRenderer(params) { return dateCellRenderer(new Date(params.value)); } }
  ];

  ngOnInit(): void {
    this.projectList = [
      { ID_PROJECT: 1, NAME: 'Project1', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) },
      { ID_PROJECT: 2, NAME: 'Project2', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) },
      { ID_PROJECT: 3, NAME: 'Project3', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) },
      { ID_PROJECT: 4, NAME: 'Project4', DETAILS: cnstProjectDetail, CREATED_ON: new Date(cnstProjectDate) }
    ];
  }

}
