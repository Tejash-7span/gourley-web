import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Subject } from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { JobCalendar } from '../../../general/models/jobs/job-calendar.model';
import { DashboardService } from '../services/dashboard.service';
import { ToastService } from '../../../general/services/toast.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { LocalStorageService } from '../../../general/services/localstorage.service';
import { JobType } from '../../../general/models/jobtype/job-type.model';
import { ROUTES } from '../../../general/models/constants';


const colors: any = {
  'drywall': {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  'stone': {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  'stucco': {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
  ,
  'metal framing': {
    primary: '#2C7A7E',
    secondary: '#9ae0e2'
  }
};

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  events: CalendarEvent[] = [];

  activeDayIsOpen = false;
  jobTypes: JobType[] = [];

  constructor(private dashboardService: DashboardService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.jobTypes = this.localStorageService.jobTypes.filter(type => type.workerEnabled);
    this.loadMonth();
  }

  loadMonth() {
    const startDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    const endDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0, 23, 59, 59);
    this.dashboardService.getCalendar(startDate, endDate)
      .then(response => {
        this.mapToEvents(response);
      })
      .catch((rejected: RejectedResponse) => {
        this.toastService.error(rejected.error);
      });
  }

  mapToEvents(data: JobCalendar[]) {
    const events = [];
    for (const item of data) {
      const jobType = this.jobTypes.find(type => type.id === item.jobTypeId);
      events.push({
        id: item.id,
        meta: item.jobTypeId,
        start: new Date(item.dateStarted),
        title: this.getTitle(item),
        color: colors[jobType.name.toLowerCase()]
      });
    }
    this.events = events;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  handleEvent(event: CalendarEvent): void {
    this.router.navigate([`${ROUTES.jobs}/${event.meta}/update/${event.id}`]);
  }

  onMonthChange() {
    this.activeDayIsOpen = false;
    this.loadMonth();
  }

  private getTitle(item: JobCalendar): string {
    let title = `#${item.id} : ${item.name}`;
    if (item.readyToBill) {
      title = title + ` (Ready to Bill)`;
    }
    if (item.invoiced) {
      title = title + ` (Invoiced : ${this.formatDate(item.jobInvoiceDate)})`;
    }
    return title;
  }

  private formatDate(date: Date) {
    if (date) {
      date = new Date(date);
      return this.getMonth(date) + '/' + this.getDate(date) + '/' + date.getFullYear();
    }
    return '';
  }
  private getDate(date: Date) {
    const dateNumber = date.getDate();
    return dateNumber < 10 ? `0${dateNumber}` : dateNumber;
  }
  private getMonth(date: Date) {
    const month = date.getMonth() + 1;
    return month < 10 ? `0${month}` : month;
  }
}
