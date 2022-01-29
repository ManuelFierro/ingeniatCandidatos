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

  //Manda los datos de registro que se llenaron en el formulario de registro
  registro(data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      //Se arma la url con todos los parametros necesarios
      this.url = 'http://apifrontend.ingeniat.com/proyectoCandidatos/registro?' +
        'firstname=' + data.firstname + '&' + 'lastname=' + data.lastname + '&' +
        'birthdate=' + data.date + '&' + 'email=' + data.email + '&' +
        'password=' + data.password

      this.http.post(this.url, '').pipe(timeout(30000)).subscribe(resp => {
        //Devuelve varios errores como email registrado pero esos errores se manejan en el ts de registros
        this.registroResp = resp;
        resolve(this.registroResp);
      }, error => {
        reject(error)
        console.log(' error en UPLOAD ruta: ', error);
      })
    })
  }
}
