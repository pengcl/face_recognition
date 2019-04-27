import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { formDataToUrl } from '@shared/utils/utils';

@Injectable({ providedIn: 'root' })
export class PlaceService {

  constructor(private http: HttpClient) {
  }

  list(body): Observable<any> {
    return this.http.post('api/place/list' + formDataToUrl(body, true), {});
  }
}
