import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PassengerService {
  constructor(private http: HttpClient) {
  }

  get(id?): Observable<any> {
    let url = 'api/passengers';
    if (id) {
      url = 'api/passengers/' + id;
    }
    return this.http.get(url);
  }

  post(body): Observable<any> {
    return this.http.post('api/passengers', body);
  }

  count(): Observable<any> {
    return this.http.get('api/passengers/count');
  }

  put(id, body): Observable<any> {
    return this.http.put('api/passengers/' + id, body);
  }

  save(body, id?): Observable<any> {
    if (id) {
      return this.put(id, body);
    } else {
      return this.post(body);
    }
  }

  delete(id): Observable<any> {
    return this.http.delete('api/passengers/' + id);
  }
}
