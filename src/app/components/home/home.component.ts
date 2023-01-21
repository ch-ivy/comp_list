import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  page = 1;
  pageSize = 9;
  constructor(private api: ApiService) {}

  get list() {
    return this.api.list;
  }

  get filters() {
    return this.api.filters;
  }

  async ngOnInit(): Promise<void> {
    this.api.list = [...this.api.tempList];
  }
}
