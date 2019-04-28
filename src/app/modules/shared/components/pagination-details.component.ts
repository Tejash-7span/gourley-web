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
        const from = ((this.currentPage - 1) * this.perPage) + 1;
        let to = from + this.perPage;
        to = to < this.totalItems ? to : this.totalItems;
        this.details = `Showing ${from} to ${to} out of ${this.totalItems}`;
    }
}
