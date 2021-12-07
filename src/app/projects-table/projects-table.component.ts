import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subscription, tap } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit, OnDestroy {
  public projects: Project[] = [];
  public projectSub!: Subscription;
  public headers: string[] = [];
  public sortedData!: Project[];
  public enableEdit = false;
  public enableEditIndex: number | null = null;

  constructor(private projectService: ProjectService) {

  }

  ngOnInit(): void {
    this.projectSub = this.projectService.$projectData
      .subscribe(results => {
        this.sortedData = Array.from(results);
        console.log('result', results);
      });
  }

  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
  }

  sortData(sort: Sort): void {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        case 'division':
          return this.compare(a.division, b.division, isAsc);
        case 'project_owner':
          return this.compare(a.project_owner, b.project_owner, isAsc);
        case 'budget':
          return this.compare(a.budget, b.budget, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'created':
          return this.compare(a.created, b.created, isAsc);
        case 'modified':
          return this.compare(a.modified || '', b.modified || '', isAsc);
        default:
          return 0;
      }
    })
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  toggleEditable(index: number): void {
    this.enableEdit = true;
    this.enableEditIndex = index;
  }

  updateStatus(value: string, index: number): void {
    this.sortedData[index].status = value;
  }

}
