import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { AlarmDto } from '@brand/components/alarm/alarm.dto';

import { AlarmComponent } from '@brand/components/alarm/alarm.component';
import { formDataToUrl } from '@shared/utils/utils';

@Injectable({ providedIn: 'root' })
export class AlarmService {
  alarms = new BehaviorSubject([]);
  private overlayRef = this.overlay.create({
    positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    hasBackdrop: true,
  });

  constructor(private http: HttpClient, private overlay: Overlay) {
  }

  get(): Observable<AlarmDto[]> {
    return this.alarms.asObservable();
  }

  set(alarms: AlarmDto[]) {
    this.alarms.next(alarms);
  }

  add(alarm: AlarmDto) {
    const alarms = this.alarms.getValue();
    alarms.push(alarm);
    this.set(alarms);
  }

  list(body): Observable<any> {
    return this.http.post('api/alarm/list' + formDataToUrl(body, true), {});
  }

  item(alarmId): Observable<any> {
    return this.http.get('api/alarm/info?alarmId=' + alarmId);
  }

  delete(id): Observable<any> {
    return this.http.delete('api/passengers/' + id);
  }

  targetTypes(): Observable<any> {
    return this.http.post('api/targetType/list', {});
  }

  targetUsers(body): Observable<any> {
    return this.http.post('api/targetUser/list' + formDataToUrl(body, true), {});
  }

  show() {
    const AlarmProfilePortal = new ComponentPortal(AlarmComponent);
    this.overlayRef.attach(AlarmProfilePortal);
  }

  hide() {
    this.overlayRef.detach();
  }

  remove() {
  }

  update() {
  }

  clean() {
  }
}
