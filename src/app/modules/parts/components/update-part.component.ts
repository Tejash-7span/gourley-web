import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { priceValidator } from '../../../general/helpers/number.validator';
import { PartModel } from '../../../general/models/parts/part.model';
import { PartService } from '../../../general/services/part.service';
import { ToastService } from '../../../general/services/toast.service';
import { JobType } from '../../../general/models/jobtype/job-type.model';
import { LocalStorageService } from '../../../general/services/localstorage.service';

@Component({
    selector: 'app-update-part',
    templateUrl: 'update-part.component.html'
})
export class UpdatePartComponent implements OnInit, AfterViewInit {

    @ViewChild('firstControl')
    firstControl: ElementRef;

    partForm: FormGroup;
    submitted = false;
    id = 0;
    existing: PartModel;
    jobTypes: JobType[] = [];

    constructor(private router: Router,
        private element: ElementRef,
        private route: ActivatedRoute,
        private partService: PartService,
        private localStorageService: LocalStorageService,
        private toastService: ToastService,
        private formBuilder: FormBuilder) {
    }

    get form() {
        return this.partForm.controls;
    }

    ngOnInit(): void {
        this.jobTypes = this.localStorageService.jobTypes.filter(type => type.jobEnabled);
        this.partForm = this.formBuilder.group({
            description: ['', [Validators.required, Validators.maxLength(70)]],
            averagePrice: ['', [Validators.required, priceValidator]],
            crewCost: ['', [Validators.required, priceValidator]],
            priceB: ['', [Validators.required, priceValidator]],
            priceC: ['', [Validators.required, priceValidator]],
            active: [''],
            jobTypeId: ['']
        });

        this.route.params.subscribe(data => {
            if (data['id']) {
                this.id = data['id'];
                if (this.id > 0) {
                    this.loadPart();
                }
            }
        });
    }

    ngAfterViewInit(): void {
        this.firstControl.nativeElement.focus();
    }

    savePart() {
        this.submitted = true;
        if (this.partForm.valid) {
            this.partService.updatePart(PartModel.createInstance(this.id, this.partForm))
                .then(response => {
                    this.toastService.success('Part is updated successfully');
                    this.backToList();
                })
                .catch((rejected: RejectedResponse) => {
                    this.toastService.error(rejected.error);
                });
        } else {
            this.focusFirstError();
        }
    }

    resetForm() {
        this.submitted = false;
        this.loadPart();
    }

    backToList() {
        this.router.navigate([ROUTES.parts]);
    }

    private loadPart() {
        if (this.existing) {
            this.partForm.patchValue(this.existing);
        } else {
            this.partService.get(this.id)
                .then((response: PartModel) => {
                    this.existing = response;
                    this.partForm.patchValue(response);
                })
                .catch((rejected: RejectedResponse) => {
                    this.toastService.error(rejected.error);
                });
        }
    }

    focusFirstError() {
        const invalidControls = this.element.nativeElement.querySelectorAll('.form-control.ng-invalid');
        (<HTMLInputElement>invalidControls[0]).focus();
    }
}

