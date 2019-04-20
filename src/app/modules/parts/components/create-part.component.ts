import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { mustMatch } from '../../../general/helpers/must-match.validator';
import { PartService } from '../services/part.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { PartModel } from '../models/part.model';
import { ROUTES } from '../../../general/models/constants';
import { priceValidator } from '../../../general/helpers/number.validator';

@Component({
  selector: 'app-create-part',
  templateUrl: 'create-part.component.html'
})
export class CreatePartComponent implements OnInit {

  errorMessage: string;
  partForm: FormGroup;
  submitted = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private partService: PartService,
    private formBuilder: FormBuilder) {
  }

  get form() {
    return this.partForm.controls;
  }

  ngOnInit(): void {
    this.partForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(70)]],
      avgPrice: ['', [Validators.required, priceValidator]],
      crewCost: ['', [Validators.required, priceValidator]],
      priceB: ['', [Validators.required, priceValidator]],
      priceC: ['', [Validators.required, priceValidator]],
      active: ['']
    });

    this.partForm.patchValue({
      avgPrice: 0,
      crewCost: 0,
      priceB: 0,
      priceC: 0,
      active: true
    });
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

  backToList() {
    this.router.navigate([ROUTES.parts]);
  }
}

