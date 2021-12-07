import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import * as data from '../../assets/data.json';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public $projectData: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(data);

  constructor() { }

  updateProjects(data: Project[]): void {
    this.$projectData.next(data);
  }
}
