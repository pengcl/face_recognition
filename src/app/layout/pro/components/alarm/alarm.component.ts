import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval as observableInterval, timer as observableTimer } from 'rxjs';
import { AlarmDto } from '@brand/components/alarm/alarm.dto';

import { AlarmService } from '@brand/components/alarm/alarm.service';

@Component({
  selector: 'alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.less'],
})

export class AlarmComponent implements OnInit, OnDestroy {
  target_img = '/assets/tmp/img/1.jpg';
  interval;
  scanning = true;

  target: AlarmDto;
  hit = false;

  constructor(private alarmSvc: AlarmService) {
  }

  ngOnInit() {
    this.target = {
      name: '克里斯汀·斯图尔特',
      no: '100025202365',
      sex: '女',
      native: '广西',
      nation: '汉',
      database: '涉黄库',
      passport_type: '身份证',
      passport_no: '360428199010250010',
      pic: '/assets/tmp/img/9.jpg',
    };
    this.interval = observableInterval(300).subscribe(() => {
      const idx = Math.round(Math.random() * 8) + 1;
      this.target_img = `/assets/tmp/img/${idx}.jpg`;
      if (idx === 9) {
        this.interval.unsubscribe();
        this.hit = true;
        observableTimer(2000).subscribe(() => {
          this.scanning = false;
        });
      }
    });
  }

  close() {
    this.alarmSvc.hide();
  }

  ngOnDestroy() {
    this.interval.unsubscribe();
  }
}
