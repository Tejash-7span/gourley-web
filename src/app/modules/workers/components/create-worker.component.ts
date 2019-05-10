import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { WorkerService } from '../../../general/services/worker.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { WorkerModel } from '../../../general/models/workers/worker.model';
import { JobType } from '../../../general/models/jobtype/job-type.model';
import { LocalStorageService } from '../../../general/services/localstorage.service';
import { ToastService } from '../../../general/services/toast.service';

@Component({
  selector: 'app-create-worker',
  templateUrl: 'create-worker.component.html'
})
export class CreateWorkerComponent implements OnInit, AfterViewInit {

  @ViewChild('firstControl')
  firstControl: ElementRef;


  workerForm: FormGroup;
  jobType: JobType;
  submitted = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private workerService: WorkerService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
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
        const jobTypeId = +data['type'];
        this.jobType = this.localStorageService.jobTypes.find(jobType => jobType.id === jobTypeId);
        if (!this.jobType) {
          this.router.navigate([ROUTES.notfound]);
        }
      } else {
        this.router.navigate([ROUTES.notfound]);
      }
    });
  }

  ngAfterViewInit() {
    this.firstControl.nativeElement.focus();
  }

  saveWorker() {
    this.submitted = true;
    if (this.workerForm.valid) {
      this.workerService.createWorker(WorkerModel.createInstance(0, this.jobType.id, this.workerForm))
        .then(response => {
          this.toastService.success('Worker is created successfully');
          this.backToList();
        })
        .catch((rejected: RejectedResponse) => {
          this.toastService.error(rejected.error);
        });
    }
  }

  resetForm() {
    this.submitted = false;
    this.workerForm.patchValue(new WorkerModel());
  }

  backToList() {
    this.router.navigate([`${ROUTES.workers}/${this.jobType.id}`]);
  }
}

