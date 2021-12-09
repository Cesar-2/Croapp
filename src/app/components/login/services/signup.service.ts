import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private https: HttpClient) { }

  public register(body) {
    return this.https.post(environment.endpoint + "user/register", body)
  }

  public editUser(id, body) {
    return this.https.patch(environment.endpoint + `user/${id}`, body);
  }
}
