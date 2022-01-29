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

  //Método de autenticación, se manda un email y password
  auth(email, password) {
    return new Promise((resolve, reject) => {
      //Se arma la url concatenando como parametros el email y password
      this.url = 'https://apifrontend.ingeniat.com/proyectoCandidatos/login?' +
        'email=' + email + '&' + 'password=' + password

      this.http.post(this.url, '').pipe(timeout(30000)).subscribe(resp => {
        this.authResp = resp;
        console.log("Respuesta ", this.authResp)
        //Se verifica la respuesta si es true es que todo fue bien y regresa un token que se usa en consultas
        //Este token se guarda en el localStorage
        //De lo contrario mandara error
        if (this.authResp['response'] == true) {
          localStorage.setItem("token", this.authResp['data'].jwt)
          console.log("TOKEN ", this.authResp['data'].jwt)
          resolve(this.authResp);
        } else {
          reject(this.authResp);
        }
      }, error => {
        reject(error)
        console.log(' error en UPLOAD ruta: ', error);
      })
    })
  }
}
