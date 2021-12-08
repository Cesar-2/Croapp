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
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
   }


  public auth(body): Observable<any> {
    return this.https.post<any>(environment.endpoint + "user/login/", body )

  }

  public getFinance(header){
    return this.https.get(environment.endpoint + "finance/finances/", header)
  }

  public getDetalle(header, id){
    return this.https.get(environment.endpoint + "finance/details/" + id, header)
  }
}
