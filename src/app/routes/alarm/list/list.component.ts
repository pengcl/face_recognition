import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AlarmService } from '@brand/components/alarm/alarm.service';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class AlarmListComponent extends AppComponentBase implements OnInit {
  q = {
    page: 1,
    limit: 10,
    orgId: '',
    placeId: '',
    dbCode: '',
    searchTxt: '',
  };
  data = [];
  loading: false;

  constructor(injector: Injector, private alarmSvc: AlarmService) {
    super(injector);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.alarmSvc.list(this.q).subscribe(res => {
      console.log(res);
      this.data = res.data;
    });
  }
}
