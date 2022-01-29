import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url: string;
  registroResp: Object;

  constructor(public http: HttpClient) { }

  registro(data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      this.url = 'https://apifrontend.ingeniat.com/proyectoCandidatos/registro';

      //Hace la peticion post mandando la url, la captura en b64 y en el header la auth
      //devuelve 210 si todo esta bien y 406 si la instancia esta inactiva
      this.http.post(this.url, data).pipe(timeout(30000)).subscribe(resp => {
        this.registroResp = resp;
        resolve(this.registroResp);
      }, error => {
        reject(error)
        console.log(' error en UPLOAD ruta: ', error);
      })
    })
  }
}
