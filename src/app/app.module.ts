import { NgModule } from '@angular/core';
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
    ProjectEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
