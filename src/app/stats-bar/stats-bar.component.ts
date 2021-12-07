import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Subject, Subscription, takeUntil } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { Project } from '../interfaces/project.interface';

@Component({
  selector: 'app-stats-bar',
  templateUrl: './stats-bar.component.html',
  styleUrls: ['./stats-bar.component.scss']
})
export class StatsBarComponent implements OnInit, OnDestroy {
  public allProjects = 0;
  public newProjects = 0;
  public workingProjects = 0;
  public archivedProjects = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(private readonly projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.$projectData.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(projects => {
      this.allProjects = projects.length;
      this.newProjects = Object.values(projects).filter(project => project.status === 'new').length;
      this.workingProjects = Object.values(projects).filter(project => project.status === 'working').length;
      this.archivedProjects = Object.values(projects).filter(project => project.status === 'archived').length;
    });


  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getNewProjects(): void {

  }

  getWorkingProjects(): void {
    this.projectService.$projectData.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(projects => this.workingProjects = projects.filter(project => project.status === 'new').length);
  }

  getArchivedProjects(): void {
    this.projectService.$projectData.pipe(
      takeUntil(this.unsubscribe$),
      map(projects => projects.filter(project => project.status === 'archived'))
    ).subscribe(projects => this.archivedProjects = projects.length);
  }

}
