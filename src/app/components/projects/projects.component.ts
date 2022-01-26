import { ProjectService } from './../../services/project.service';
import { PopupHandler } from './../../shared/popup-handler';
import { ProjectModel } from './../../models/project.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { dateCellRenderer } from '../../shared/cell-renderer-functions';

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
    { width: 150, cellRenderer: () => `<button class="btn btn-primary">Edit Project</button>`, onCellClicked: params => this.popupHandler.openProjectEntry(params.data) },
    {
      width: 150, cellRenderer: () => `<button class="btn btn-primary">Delete Project</button>`,
      onCellClicked: params => this.projectService.delete(params.data.ID_PROJECT).subscribe({
        next: () => this.getAll()
      })
    }
  ];

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly popupHandler: PopupHandler,
    private readonly projectService: ProjectService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.projectService.getAll().subscribe({
      next: data => {
        this.projectList = data;
        this.cd.markForCheck();
      }
    });
  }

  openProjectEntryDialog() {
    const maxProjectId = Math.max(...this.projectList.map(x => x.ID_PROJECT));
    const addProject: ProjectModel = { ID_PROJECT: maxProjectId + 1, NAME: '', DETAILS: '', CREATED_ON: new Date() };
    this.popupHandler.openProjectEntry(addProject);
    this.cd.markForCheck();
  }

  onDialogClose(successFlag: boolean) {
    if (successFlag) {
      this.getAll();
    }
  }

}
