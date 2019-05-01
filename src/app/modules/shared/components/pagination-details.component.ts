import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-pagination-details',
    templateUrl: 'pagination-details.component.html'
})

export class PaginationDetailsComponent implements OnChanges {
    @Input()
    currentPage: number;

    @Input()
    perPage: number;

    @Input()
    totalItems: number;

    details: string;
    ngOnChanges() {
        let from = ((this.currentPage - 1) * this.perPage) + 1;
        from = this.totalItems === 0 ? 0 : from;
        let to = from + this.perPage;
        to = to < this.totalItems ? to : this.totalItems;
        this.details = `Showing ${from} to ${to} out of ${this.totalItems}`;
    }
}
