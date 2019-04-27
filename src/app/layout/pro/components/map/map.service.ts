import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MapService {
  constructor(private http: HttpClient) {
  }

  get(target): Observable<any> {
    return this.http.get('/assets/data/' + target + '.json');
  }
}
