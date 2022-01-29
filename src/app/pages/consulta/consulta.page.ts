import { ConsultaService } from './../../services/consulta.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  listaVehiculos: any = [];
  listaMarcas: any = [];
  selectedMarca: any
  listaVehiculosView: any[];
  constructor(
    private consultaServ: ConsultaService,
    private msgService: MessageService,
  ) { }

  ngOnInit() {

  }

  //al DidEnter o cuando entra a la página ejecuta la api del servicio de vehiculos y llena las listas
  //listaVehiculos es la lista de los vehiculos
  //listaMarcas es la lista de las marcas que se usa para el filtrado
  ionViewDidEnter() {
    this.consultaServ.consulta().then((result) => {
      this.listaVehiculos = this.consultaServ.resultados
      this.listaMarcas = this.consultaServ.marcas
      console.log('listaVehiculos', this.listaVehiculos);
      console.log('listaMarcas', this.listaMarcas);
    }).catch((err) => {
      console.log('listaMarcas err', err);

    });

  }
  //Hace el efecto para refrescar la pantalla al hacer pull
  async doRefresh($event) {

    this.consultaServ.consulta().then(resp => {
      this.listaVehiculos = this.consultaServ.resultados
      this.listaMarcas = this.consultaServ.marcas
      console.log('listaVehiculos refresh', this.listaVehiculos);
      console.log('listaMarcas refresh', this.listaMarcas);
      $event.target.complete();
      this.msgService.add({ key: 'tst', severity: 'success', summary: "Se actualizaron los vehiculos", detail: 'Se actualizaron los vehiculos' });
    }).catch(error => {
      console.log("error en refresh", error);
      $event.target.complete();
      this.msgService.add({ key: 'tst', severity: 'error', summary: "Hubo un error al consultar la lista de vehiculos", detail: 'Error' });
    })
  }

  //Hace el proceso de filtrado al usar el dropdown/select
  //Se tiene una variable temporal que se limpia cada que cambia algo en el dropdown
  //Se cicla el array de resultados del service(original)
  //Se cicla el array de marcas seleccionadas dentro del array de resultados
  //Se compara si tienen el mismo nombre de marca, si lo tienen se agrega a la variable temporal
  //Se actualiza la lista que se usa para poblar la tabla con las marcas filtradas
  filtrarMarca() {
    let listaFiltrada = []
    if (this.selectedMarca.length > 0) {
      this.consultaServ.resultados.forEach(selV => {
        this.selectedMarca.forEach(marca => {
          if (selV.nombreMarca == marca.nombre) {
            listaFiltrada.push(selV);
          }
        });
      });
      console.log("lista filtrada ", listaFiltrada)
      this.listaVehiculos = listaFiltrada;
    }
  }

}
