import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataModel } from 'src/app/services/model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  details!: DataModel;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  get list() {
    return this.api.list;
  }

  ngOnInit(): void {
    this.api.filters = [];
    this.route.queryParams.subscribe((x) => {
      const id = x['id'];
      if (id && this.api.tempList.length > id) {
        this.details = this.api.tempList[id];
      } else {
        this.router.navigate(['']);
      }
    });
  }

  splitText(text: any) {
    return text.split('.')[1];
  }

  textToArray(text: any) {
    return text.split(',');
  }
}
