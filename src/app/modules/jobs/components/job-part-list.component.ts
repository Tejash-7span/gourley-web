import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { JobPartModel } from '../../../general/models/parts/job-part.model';
import { PartModel } from '../../../general/models/parts/part.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { quantityValidator } from '../../../general/helpers/number.validator';
import { PartService } from '../../../general/services/part.service';
import { ToastService } from '../../../general/services/toast.service';

@Component({
  selector: 'app-job-part-list',
  templateUrl: 'job-part-list.component.html'
})
export class JobPartListComponent implements OnInit {

  @ViewChild('firstControl')
  firstControl: ElementRef;

  @Input()
  datasource: JobPartModel[] = [];

  datasourceBackup: JobPartModel[];

  parts: PartModel[] = [];

  jobPartForm: FormGroup;
  submitted = false;
  currentPartId = 0;
  isUpdate = false;

  constructor(private partService: PartService,
    private toastService: ToastService,
    private formBuilder: FormBuilder) {

  }
  private get form() {
    return this.jobPartForm.controls;
  }

  private get partId(): number {
    return +this.jobPartForm.value['partId'];
  }

  private get quantity(): number {
    return +this.jobPartForm.value['quantity'];
  }

  ngOnInit(): void {
    this.backupDatasource();
    this.getParts();
    this.jobPartForm = this.formBuilder.group({
      partId: ['', [Validators.required]],
      quantity: ['', [Validators.required, quantityValidator, Validators.maxLength(10)]]
    });

    this.jobPartForm.patchValue({
      partId: '',
      quantity: ''
    });
  }

  public getValues(): JobPartModel[] {
    return this.datasource;
  }

  public resetValues(): void {
    this.restoreDatasource();
    this.resetForm();
  }

  private backupDatasource() {
    this.datasourceBackup = JSON.parse(JSON.stringify(this.datasource));
  }

  private restoreDatasource() {
    this.datasource = JSON.parse(JSON.stringify(this.datasourceBackup));
  }

  private getParts() {
    this.partService.getAll().then(response => {
      this.parts = response;
    });
  }

  private setUpdateMode(jobPart: JobPartModel) {
    this.currentPartId = jobPart.partId;
    this.resetForm(jobPart.partId, jobPart.quantity);
    this.isUpdate = true;
  }

  private cancelUpdateMode() {
    this.isUpdate = false;
    this.resetForm();
  }

  private saveJobPart() {
    this.submitted = true;
    if (this.jobPartForm.valid) {
      if (this.currentPartId === 0) {
        this.addItem();
      } else {
        this.updateItem();
      }
    }
  }

  private addItem() {
    if (this.isExist()) {
      this.addError('Part is already added to the list');
    } else {
      const jobPart = JobPartModel.createInstance(this.partId, this.quantity);
      const part = this.parts.find(item => item.id === this.partId);
      jobPart.part = PartModel.cloneInstance(part);
      this.datasource.push(jobPart);
      this.isUpdate = false;
      this.currentPartId = 0;
      this.resetForm();
    }
  }

  private updateItem() {
    if (this.currentPartId !== this.partId && this.isExist()) {
      this.addError('Part is already added to the list');
    } else {
      const part = this.parts.find(item => item.id === this.partId);
      const jobPart = this.datasource.find(item => item.partId === this.currentPartId);
      jobPart.partId = this.partId;
      jobPart.quantity = this.quantity;
      jobPart.part = PartModel.cloneInstance(part);
      this.isUpdate = false;
      this.currentPartId = 0;
      this.resetForm();
    }
  }

  private deleteItem(jobPart: JobPartModel) {
    const index = this.datasource.findIndex(item => item.partId === jobPart.partId);
    this.datasource.splice(index, 1);
  }

  private isExist() {
    return this.datasource.findIndex(part => part.partId === this.partId) > -1;
  }

  private resetForm(partId: any = '', quantity: any = '') {
    this.submitted = false;
    this.jobPartForm.patchValue({
      partId: partId,
      quantity: quantity
    });
    this.firstControl.nativeElement.focus();
  }

  private addError(message: string) {
    this.toastService.error(message);
  }
}
