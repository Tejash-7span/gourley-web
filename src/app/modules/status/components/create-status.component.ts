import { Component, OnInit, ViewChild, ElementRef, ViewChildren, AfterViewInit, QueryList, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StatusService } from '../services/status.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { priceValidator } from '../../../general/helpers/number.validator';
import { StatusModel } from '../../../general/models/status/status.model';

@Component({
  selector: 'app-create-status',
  templateUrl: 'create-status.component.html'
})
export class CreateStatusComponent implements OnInit, AfterViewInit {


  @ViewChild('firstControl')
  firstControl: ElementRef;

  errorMessage: string;
  statusForm: FormGroup;
  submitted = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private statusService: StatusService,
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
          this.backToList();
        })
        .catch((rejected: RejectedResponse) => {
          this.errorMessage = rejected.error;
        });
    }
  }

  resetForm() {
    this.submitted = false;
    this.statusForm.patchValue(new StatusModel());
  }

  backToList() {
    this.router.navigate([ROUTES.status]);
  }
}

