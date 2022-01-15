import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { UserEntryComponent } from './components/user-entry/user-entry.component';
import { TaskEntryComponent } from './components/task-entry/task-entry.component';
import { ProjectEntryComponent } from './components/project-entry/project-entry.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from './components/page-title/page-title.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    ProjectsComponent,
    TasksComponent,
    LeftMenuComponent,
    UserEntryComponent,
    TaskEntryComponent,
    ProjectEntryComponent,
    PageTitleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    AgGridModule.withComponents()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
