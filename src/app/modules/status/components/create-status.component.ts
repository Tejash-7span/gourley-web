import { Component, OnInit, ViewChild, ElementRef, ViewChildren, AfterViewInit, QueryList, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StatusService } from '../../../general/services/status.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { priceValidator } from '../../../general/helpers/number.validator';
import { StatusModel } from '../../../general/models/status/status.model';
import { ToastService } from '../../../general/services/toast.service';

@Component({
  selector: 'app-create-status',
  templateUrl: 'create-status.component.html'
})
export class CreateStatusComponent implements OnInit, AfterViewInit {


  @ViewChild('firstControl')
  firstControl: ElementRef;


  statusForm: FormGroup;
  submitted = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private element: ElementRef,
    private statusService: StatusService,
    private toastService: ToastService,
    private renderer: Renderer2,
    private formBuilder: FormBuilder) {
  }

  get form() {
    return this.statusForm.controls;
  }

  ngOnInit(): void {
    this.statusForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(45)]],
    });

    this.resetForm();
  }

  ngAfterViewInit(): void {
    this.firstControl.nativeElement.focus();
  }

  saveStatus() {
    this.submitted = true;
    if (this.statusForm.valid) {
      this.statusService.createStatus(StatusModel.createInstance(0, this.statusForm))
        .then(response => {
          this.toastService.success('Status is created successfully');
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
    this.statusForm.patchValue(new StatusModel());
  }

  backToList() {
    this.router.navigate([ROUTES.status]);
  }

  focusFirstError() {
    const invalidControls = this.element.nativeElement.querySelectorAll('.form-control.ng-invalid');
    (<HTMLInputElement>invalidControls[0]).focus();
  }
}

