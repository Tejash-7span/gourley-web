import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StatusService } from '../services/status.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { priceValidator } from '../../../general/helpers/number.validator';
import { StatusModel } from '../../../general/models/status/status.model';

@Component({
    selector: 'app-update-status',
    templateUrl: 'update-status.component.html'
})
export class UpdateStatusComponent implements OnInit, AfterViewInit {

    @ViewChild('firstControl')
    firstControl: ElementRef;

    errorMessage: string;
    statusForm: FormGroup;
    submitted = false;
    id = 0;
    existing: StatusModel;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private statusService: StatusService,
        private formBuilder: FormBuilder) {
    }

    get form() {
        return this.statusForm.controls;
    }

    ngOnInit(): void {
        this.statusForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(45)]],
        });

        this.route.params.subscribe(data => {
            if (data['id']) {
                this.id = data['id'];
                if (this.id > 0) {
                    this.loadStatus();
                }
            }
        });
    }

    ngAfterViewInit(): void {
        this.firstControl.nativeElement.focus();
    }

    saveStatus() {
        this.submitted = true;
        if (this.statusForm.valid) {
            this.statusService.updateStatus(StatusModel.createInstance(this.id, this.statusForm))
                .then(response => {
                    this.backToList();
                })
                .catch((rejected: RejectedResponse) => {
                    this.errorMessage = rejected.error;
                });
        }
    }

    resetForm() {
        this.submitted = false;
        this.loadStatus();
    }

    backToList() {
        this.router.navigate([ROUTES.status]);
    }

    private loadStatus() {
        if (this.existing) {
            this.statusForm.patchValue(this.existing);
        } else {
            this.statusService.get(this.id)
                .then((response: StatusModel) => {
                    this.existing = response;
                    this.statusForm.patchValue(response);
                })
                .catch((rejected: RejectedResponse) => {
                    this.errorMessage = rejected.error;
                });
        }
    }
}

