import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobService } from '../services/job.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { GetWorkTypeName, isTypeValid } from '../../../general/helpers/enum.helper';
import { WorkType } from '../../../general/enums/worktype.enum';
import { JobModel } from '../../../general/models/jobs/job.model';

@Component({
    selector: 'app-update-job',
    templateUrl: 'update-job.component.html'
})
export class UpdateJobComponent {

}

