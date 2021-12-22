import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-pagination-demo';
  items: { id: number; name: string }[] = [];
  pageOfItems: any[] = [];
  per_page = 10;
  get total() {
    return this.items.length;
  }
  ngOnInit() {
    // an example array of 150 items to be paged
    this.items = Array(150)
      .fill(0)
      .map((x, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
  }

  pageChange(page: number) {
    this.pageOfItems = this.items.slice(
      (page - 1) * this.per_page,
      page * this.per_page
    );
  }
}
