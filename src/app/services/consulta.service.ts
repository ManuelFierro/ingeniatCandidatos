import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url: string;
  consultaResp: Object;
  marcas: any;
  resultados: any;

  constructor(public http: HttpClient) { }

  //Consumo de la api de lista que sirve para poblar la tabla de vehiculos
  consulta() {
    return new Promise((resolve, reject) => {

      //Se manda el token que se obtiene en el login
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      });
      this.url = 'http://apifrontend.ingeniat.com/proyectoCandidatos/lista';

      //Se hace la petición y regresa varias listas que sirven para poblar lo que hay en la página de consulta
      this.http.get(this.url, { headers }).pipe(timeout(30000)).subscribe(resp => {
        this.consultaResp = resp;
        console.log('this.consultaResp ', this.consultaResp)
        //Estas dos variables se usan directamente en el page de consulta
        this.resultados = this.consultaResp['data'].resultados
        this.marcas = this.consultaResp['data'].marcas
        console.log(' this.resultados ', this.resultados)
        console.log('this.marcas ', this.marcas)
        resolve(this.consultaResp)
      }, error => {
        reject(error)
        console.log(' error en UPLOAD ruta: ', error);
      })
    })
  }
}
