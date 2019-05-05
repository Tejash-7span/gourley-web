import { Component, OnInit, ViewChild, ElementRef, ViewChildren, AfterViewInit, QueryList, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { priceValidator } from '../../../general/helpers/number.validator';
import { PartModel } from '../../../general/models/parts/part.model';
import { PartService } from '../../../general/services/part.service';

@Component({
  selector: 'app-create-part',
  templateUrl: 'create-part.component.html'
})
export class CreatePartComponent implements OnInit, AfterViewInit {


  @ViewChild('firstControl')
  firstControl: ElementRef;

  errorMessage: string;
  partForm: FormGroup;
  submitted = false;

  constructor(private router: Router,
    private partService: PartService,
    private formBuilder: FormBuilder) {
  }

  get form() {
    return this.partForm.controls;
  }

  ngOnInit(): void {
    this.partForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(70)]],
      averagePrice: ['', [Validators.required, priceValidator]],
      crewCost: ['', [Validators.required, priceValidator]],
      priceB: ['', [Validators.required, priceValidator]],
      priceC: ['', [Validators.required, priceValidator]],
      active: ['']
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
          this.backToList();
        })
        .catch((rejected: RejectedResponse) => {
          this.errorMessage = rejected.error;
        });
    }
  }

  resetForm() {
    this.submitted = false;
    this.partForm.patchValue(new PartModel());
  }

  backToList() {
    this.router.navigate([ROUTES.parts]);
  }
}

