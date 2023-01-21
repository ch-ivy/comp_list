import { Component, OnInit } from '@angular/core';
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
  constructor(private api: ApiService) {
    this.api.getData();
  }

  async ngOnInit() {
    await this.api.getData();
    this.isLoading.next(false);
  }

  get industries() {
    return this.api.getIndustries();
  }

  searchList() {
    this.api.list = [...this.api.tempList].filter((x) => {
      return x.name.toLowerCase().match(this.search.toLowerCase());
    });
  }

  filterList(value: string) {
    this.api.list = [...this.api.tempList].filter((x) => {
      return x.industry.includes(value);
    });
  }
}
