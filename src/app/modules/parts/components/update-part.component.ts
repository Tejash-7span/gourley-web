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
    selector: 'app-update-part',
    templateUrl: 'update-part.component.html'
})
export class UpdatePartComponent implements OnInit {

    errorMessage: string;
    partForm: FormGroup;
    submitted = false;
    id = 0;

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

        this.route.params.subscribe(data => {
            if (data['id']) {
                this.id = data['id'];
                if (this.id > 0) {
                    this.loadPart();
                }
            }
        });
    }

    savePart() {
        this.submitted = true;
        if (this.partForm.valid) {
            this.partService.updatePart(PartModel.createInstance(this.id, this.partForm))
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

    private loadPart() {
        this.partService.get(this.id)
            .then((response: PartModel) => {
                this.partForm.patchValue(response);
            })
            .catch((rejected: RejectedResponse) => {
                this.errorMessage = rejected.error;
            });
    }
}

