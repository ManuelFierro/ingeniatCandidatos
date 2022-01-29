import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url: string;
  consultaResp: Object;

  constructor(public http: HttpClient) { }

  consulta() {
    return new Promise((resolve, reject) => {

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      });

      this.url = 'https://apifrontend.ingeniat.com/proyectoCandidatos/lista';

      //Hace la peticion post mandando la url, la captura en b64 y en el header la auth
      //devuelve 210 si todo esta bien y 406 si la instancia esta inactiva
      this.http.post(this.url, { headers }).pipe(timeout(30000)).subscribe(resp => {
        this.consultaResp = resp;

      }, error => {
        reject(error)
        console.log(' error en UPLOAD ruta: ', error);
      })
    })
  }
}
