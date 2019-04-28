import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { WorkerService } from '../services/worker.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { WorkType } from '../../../general/enums/worktype.enum';
import { isTypeValid, GetWorkTypeName } from '../../../general/helpers/enum.helper';
import { WorkerModel } from '../../../general/models/workers/worker.model';

@Component({
  selector: 'app-create-worker',
  templateUrl: 'create-worker.component.html'
})
export class CreateWorkerComponent implements OnInit, AfterViewInit {

  @ViewChild('firstControl')
  firstControl: ElementRef;

  errorMessage: string;
  workerForm: FormGroup;
  workType: WorkType;
  workTypeName: string;
  submitted = false;

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
      this.workerService.createWorker(this.workType, WorkerModel.createInstance(0, this.workerForm))
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
    this.workerForm.patchValue(new WorkerModel());
  }

  backToList() {
    this.router.navigate([`${ROUTES.workers}/${this.workType}`]);
  }
}

