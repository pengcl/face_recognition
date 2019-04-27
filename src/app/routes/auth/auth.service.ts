import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { formDataToUrl } from '@shared/utils/utils';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(body): Observable<any> {
    return this.http.post('api/sys/login?_allow_anonymous=true' + formDataToUrl(body, false), {});
  }

  register(body): Observable<any> {
    return this.http.post('api/auth/local?_allow_anonymous=true', body);
  }
}
