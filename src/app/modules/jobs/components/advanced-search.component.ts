import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';

@Component({
    selector: 'app-advanced-search',
    templateUrl: 'advanced-search.component.html'
})

export class AdvancedSearchComponent implements OnInit {

    @Output()
    search: EventEmitter<IAdvancedSearchParams> = new EventEmitter<IAdvancedSearchParams>();

    @ViewChild('firstControl')
    firstControl: ElementRef;

    @ViewChild('advancedSearchModel')
    public advancedSearchModel: ModalDirective;

    data: IAdvancedSearchParams;

    isCustomerName = true;
    isDate = false;

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        disableUntil: {
            year: 0,
            month: 0,
            day: 0
        }
    };

    constructor() { }

    ngOnInit(): void {
        this.data = {
            customerName: '',
            startDate: '',
            endDate: ''
        };
    }

    searchByCustomerName() {
        this.isCustomerName = true;
        this.isDate = false;
        this.data.startDate = '';
        this.data.endDate = '';
    }

    searchByDate() {
        this.isCustomerName = false;
        this.isDate = true;
        this.data.customerName = '';
    }

    show(data: IAdvancedSearchParams) {
        this.data = data;
        this.advancedSearchModel.show();
        setTimeout(() => {
            this.firstControl.nativeElement.focus();
        }, 500);
    }

    onSearch() {
        this.advancedSearchModel.hide();
        this.search.emit(this.data);
    }
}

export interface IAdvancedSearchParams {
    customerName: string;
    startDate?: any;
    endDate?: any;
}
