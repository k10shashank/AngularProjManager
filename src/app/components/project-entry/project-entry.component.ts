import { PopupHandler } from './../../shared/popup-handler';
import { NgForm } from '@angular/forms';
import { ProjectModel } from './../../models/project.model';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.scss']
})
export class ProjectEntryComponent implements OnInit {
  @ViewChild('entryForm') entryForm!: NgForm;
  showComponentFlag!: boolean;
  formData: ProjectModel = { ID_PROJECT: 0, NAME: '', DETAILS: '', CREATED_ON: new Date() };
  legend!: string;
  errorMsg!: string;

  constructor(private readonly cd: ChangeDetectorRef,
    private readonly popupHandler: PopupHandler) { }

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
      this.onClose();
    }
    this.cd.markForCheck();
  }

  onClose() {
    this.formData = { ID_PROJECT: 0, NAME: '', DETAILS: '', CREATED_ON: new Date() };
    this.legend = '';
    this.errorMsg = '';
    this.entryForm.reset();
    this.showComponentFlag = false;
    this.cd.markForCheck();
  }

}
