import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { DataModel } from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  list: DataModel[] = [];
  tempList: DataModel[] = [];
  constructor(private http: HttpClient) {}

  async getData() {
    return await lastValueFrom(
      this.http
        .get('./assets/data.json')
        .pipe(map((data) => data as DataModel[]))
    )
      .then((data) => {
        this.list = data.map((x, y) => {
          return { ...x, id: y };
        });
        this.tempList = [...this.list];
        console.log(this.tempList);
      })
      .catch(console.error);
  }

  getIndustries() {
    const map = this.tempList.map((x) => x.industry).flat();
    return [...new Set(map)];
  }
}
