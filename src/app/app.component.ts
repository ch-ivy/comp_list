import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  search: string = '';
  isLoading = new BehaviorSubject(true);
  url!: string;
  constructor(private api: ApiService, private router: Router) {
    this.api.getData();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
      }
    });
  }

  async ngOnInit() {
    await this.api.getData();
    this.isLoading.next(false);
  }

  get industries() {
    return this.api.getIndustries();
  }

  get filters() {
    return this.api.filters;
  }

  addFilter(value: string) {
    this.api.filters.push(value);
    this.filterSearch();
  }

  filterSearch() {
    if (this.search && !this.filters.length) {
      this.api.list = [...this.api.tempList].filter((x) => {
        return x.name.toLowerCase().match(this.search.toLowerCase());
      });

      return;
    }

    if (!this.search && this.filters.length) {
      return this.filterListByFilters();
    }

    if (this.search && this.filters.length) {
      this.filterListByFilters();

      this.api.list = this.api.list.filter((x) => {
        return x.name.toLowerCase().match(this.search.toLowerCase());
      });
      return;
    }

    return (this.api.list = [...this.api.tempList]);
  }

  filterListByFilters() {
    this.api.list = [];

    for (let i = 0; i < this.filters.length; i++) {
      const a = [...this.api.tempList].filter((x) =>
        x.industry.includes(this.filters[i])
      );
      this.api.list.push(...a);
      this.api.list = [...new Set(this.api.list)];
    }
  }

  clearFilter(ind: string) {
    const a = this.api.filters.indexOf(ind);
    this.api.filters.splice(a, 1);
    this.filterSearch();
  }
}
