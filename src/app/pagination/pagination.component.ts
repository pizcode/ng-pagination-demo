import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  constructor() { }

  ngOnInit(): void { }
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];
  public pageCount: number = 0;
  public maxLength: number = 7;
  activePage: number = 1;

  ngOnChanges(): any {
    this.activePage = 1;
    this.pageCount = this.getPageCount();
    this.pages = this.getPageList();
    this.onPageChange.emit(1);
  }

  private getPageCount(): number {
    let totalPage = 0;
    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);
      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }
    return totalPage;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pageCount) {
      this.activePage = pageNumber;
      this.onPageChange.emit(this.activePage);
      this.pages = this.getPageList();
    }
  }

  getPageList() {
    if (this.maxLength < 5) throw 'maxLength must be at least 5';
    console.log(this.maxLength, this.pageCount, this.activePage);

    function range(start: number, end: number) {
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = this.maxLength < 9 ? 1 : 2;
    var leftWidth = (this.maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (this.maxLength - sideWidth * 2 - 2) >> 1;
    if (this.pageCount <= this.maxLength) {
      // no breaks in list
      return range(1, this.pageCount);
    }
    if (this.activePage <= this.maxLength - sideWidth - 1 - rightWidth) {
      // no break on left of page
      return range(1, this.maxLength - sideWidth - 1).concat(
        0,
        range(this.pageCount - sideWidth + 1, this.pageCount)
      );
    }
    if (this.activePage >= this.pageCount - sideWidth - 1 - rightWidth) {
      // no break on right of page
      return range(1, sideWidth).concat(
        0,
        range(this.pageCount - sideWidth - 1 - rightWidth - leftWidth, this.pageCount)
      );
    }
    // Breaks on both sides
    return range(1, sideWidth).concat(
      0,
      range(this.activePage - leftWidth, this.activePage + rightWidth),
      0,
      range(this.pageCount - sideWidth + 1, this.pageCount)
    );
  }
}
