import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { WorkerService } from '../services/worker.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { GetWorkTypeName, isTypeValid } from '../../../general/helpers/enum.helper';
import { WorkType } from '../../../general/enums/worktype.enum';
import { WorkerModel } from '../../../general/models/workers/worker.model';

@Component({
    selector: 'app-update-worker',
    templateUrl: 'update-worker.component.html'
})
export class UpdateWorkerComponent implements OnInit, AfterViewInit {

    @ViewChild('firstControl')
    firstControl: ElementRef;

    errorMessage: string;
    workerForm: FormGroup;
    submitted = false;
    id = 0;
    workType: WorkType;
    workTypeName: string;
    existing: WorkerModel;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private workerService: WorkerService,
        private formBuilder: FormBuilder) {
    }

    get form() {
        return this.workerForm.controls;
    }

    ngOnInit(): void {
        this.workerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(45)]],
        });

        this.route.params.subscribe(data => {
            if (data['type']) {
                const workType = data['type'] as number;
                this.workType = WorkType[WorkType[workType]];
                if (isTypeValid(this.workType)) {
                    this.workTypeName = GetWorkTypeName(this.workType);
                    if (data['id']) {
                        this.id = data['id'];
                        if (this.id > 0) {
                            this.loadWorker();
                        }
                    }
                } else {
                    this.router.navigate([ROUTES.notfound]);
                }
            }
        });
    }

    ngAfterViewInit() {
        this.firstControl.nativeElement.focus();
    }

    saveWorker() {
        this.submitted = true;
        if (this.workerForm.valid) {
            this.workerService.updateWorker(this.workType, WorkerModel.createInstance(this.id, this.workerForm))
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
        this.loadWorker();
    }

    backToList() {
        this.router.navigate([`${ROUTES.workers}/${this.workType}`]);
    }

    private loadWorker() {
        if (this.existing) {
            this.workerForm.patchValue(this.existing);
        } else {
            this.workerService.get(this.workType, this.id)
                .then((response: WorkerModel) => {
                    this.existing = response;
                    this.workerForm.patchValue(response);
                })
                .catch((rejected: RejectedResponse) => {
                    this.errorMessage = rejected.error;

                });
        }
    }
}

