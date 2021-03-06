import { Component, OnInit, ViewChild, ElementRef, ViewChildren, AfterViewInit, QueryList, Renderer2 } from '@angular/core';
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
  selector: 'app-create-part',
  templateUrl: 'create-part.component.html'
})
export class CreatePartComponent implements OnInit, AfterViewInit {


  @ViewChild('firstControl')
  firstControl: ElementRef;

  partForm: FormGroup;
  submitted = false;
  jobTypes: JobType[] = [];

  constructor(private router: Router,
    private element: ElementRef,
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

    this.resetForm();
  }

  ngAfterViewInit(): void {
    this.firstControl.nativeElement.focus();
  }

  savePart() {
    this.submitted = true;
    if (this.partForm.valid) {
      this.partService.createPart(PartModel.createInstance(0, this.partForm))
        .then(response => {
          this.toastService.success('Part is created successfully');
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
    this.partForm.patchValue(new PartModel());
  }

  backToList() {
    this.router.navigate([ROUTES.parts]);
  }

  focusFirstError() {
    const invalidControls = this.element.nativeElement.querySelectorAll('.form-control.ng-invalid');
    (<HTMLInputElement>invalidControls[0]).focus();
  }
}

