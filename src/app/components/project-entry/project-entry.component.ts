import { ErrorModel } from './../../models/error.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from './../../services/project.service';
import { PopupHandler } from './../../shared/popup-handler';
import { NgForm } from '@angular/forms';
import { ProjectModel } from './../../models/project.model';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.scss']
})
export class ProjectEntryComponent implements OnInit {
  @ViewChild('entryForm') entryForm!: NgForm;
  @Output() onClose = new EventEmitter();
  showComponentFlag!: boolean;
  formData: ProjectModel = { ID_PROJECT: 0, NAME: '', DETAILS: '', CREATED_ON: new Date() };
  legend!: string;
  errorMsg!: string;

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly popupHandler: PopupHandler,
    private readonly projectService: ProjectService) { }

  ngOnInit(): void {
    this.popupHandler.projectEntry().subscribe((project: ProjectModel) => {
      this.showComponentFlag = true;
      if (project.NAME === '') {
        this.legend = 'Add';
      } else {
        this.legend = 'Edit';
      }
      this.formData = project;
      this.cd.markForCheck();
    });
  }

  onSubmit() {
    if (this.formData.NAME === '') {
      this.errorMsg = 'Please enter Name';
    } else if (this.formData.DETAILS === '') {
      this.errorMsg = 'Please enter Details';
    } else {
      switch (this.legend) {
        case 'Add':
          this.projectService.add(this.formData).subscribe({
            next: () => this.onHttpSuccess(),
            error: (httpError: HttpErrorResponse) => this.onHttpError(httpError)
          });
          break;
        case 'Edit':
          this.projectService.update(this.formData).subscribe({
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
    this.formData = { ID_PROJECT: 0, NAME: '', DETAILS: '', CREATED_ON: new Date() };
    this.legend = '';
    this.errorMsg = '';
    this.entryForm.reset();
    this.showComponentFlag = false;
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
