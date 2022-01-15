import { UserModel } from './user.model';
import { ProjectModel } from './project.model';

export interface TaskModel {
    ID_TASK: number;
    DETAILS: string;
    CREATED_ON: Date;
    STATUS: string;
    ID_PROJECT: number;
    ID_USER: number;
    PROJECT: ProjectModel;
    USER: UserModel;
}
