import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpOptions: any;

  constructor(private https: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }


  public auth(body): Observable<any> {
    return this.https.post<any>(environment.endpoint + "user/login", body)

  }

  public getFinance() {
    return this.https.get(environment.endpoint + "finance/finances")
  }

  public postFinance(body): Observable<any> {
    return this.https.post(environment.endpoint + "finance/finances", body);
  }

  public getDetalle(id) {
    return this.https.get(environment.endpoint + "finance/details/" + id)
  }

  public deleteFinance(id) {
    return this.https.delete(environment.endpoint + "finance/finances" + id);
  }

  public postGasto(body) {
    return this.https.post(environment.endpoint + "finance/cost", body);
  }

}
