import { ConsultaService } from './../../services/consulta.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  listaVehiculos: any = [
    {
      "nombreModelo": "xxx1",
      "nombreMarca": "xxx1",
      "idModelo": 1
    },
    {
      "nombreModelo": "xxx2",
      "nombreMarca": "xxx2",
      "idModelo": 2
    }];

  constructor(
    private consultaServ: ConsultaService,
    private msgService: MessageService,
  ) { }

  ngOnInit() {

  }

  async doRefresh($event) {

    console.log('listaCapturas', this.listaVehiculos);
    this.consultaServ.consulta().then(resp => {
      //resp['data'].resultados
      console.log(resp, "RESP 2");
      $event.target.complete();
      //this.msgService.add({ key: 'tst', severity: 'success', summary: "Se actualizaron los vehiculos", detail: Se actualizaron los vehiculos });

    }).catch(error => {
      console.log("error en refresh", error);
      $event.target.complete();
      this.msgService.add({ key: 'tst', severity: 'error', summary: "Hubo un error al consultar la lista de vehiculos", detail: 'Error' });
    })
    $event.target.complete();
  }
}
