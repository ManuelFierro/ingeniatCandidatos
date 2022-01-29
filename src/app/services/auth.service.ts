import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;
  authResp: any;

  constructor(public http: HttpClient) { }

  auth(email, password) {
    return new Promise((resolve, reject) => {
      let data = {
        email: email,
        password: password
      }
      this.url = 'https://apifrontend.ingeniat.com/proyectoCandidatos/login';

      //Hace la peticion post mandando la url, la captura en b64 y en el header la auth
      //devuelve 210 si todo esta bien y 406 si la instancia esta inactiva
      this.http.post(this.url, data).pipe(timeout(30000)).subscribe(resp => {
        this.authResp = resp;
        console.log("Respuesta ", this.authResp)
        this.authResp.response
        resolve(this.authResp);
      }, error => {
        reject(error)
        console.log(' error en UPLOAD ruta: ', error);
      })
    })
  }
}
