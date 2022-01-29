import { ConsultaService } from './../../services/consulta.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: String = ''
  password: String = ''

  constructor(
    private msgService: MessageService,
    private authServ: AuthService,
    private navCtl: NavController,
    private consultaServ: ConsultaService
  ) { }

  ngOnInit() {
  }

  showToast(severity, summary, detail) {
    //SUMMARY CABECERO DEL TOAST,DETAIL EL MSG, SEVERITY EL GRADO DEL TOAST
    this.msgService.add({ key: 'tst', severity: severity, summary: summary, detail: detail });
  }

  login() {
    //Se verifica que no esten vacios los campos si lo estan mandara un toast
    //Si no van vacios ejecutara el metodo auth del servicio de autenticacion
    //La respuesta regresa un token que es el que se usa para poblar la lista
    //Se consume la api que tiene los datos para llenar la tabla de los vehiculos
    //Si algo sale mal se mandaran toast con su mensaje
    if (this.email == '' || this.password == '') {
      this.showToast('error', 'Error', 'Favor de ingresar usuario y contraseña')
    } else {
      console.log('Entro al auth')
      this.authServ.auth(this.email, this.password).then((result) => {
        console.log('Result al auth ', result)
        if (result['response'] == true) {
          this.showToast('success', 'Exito', 'Se logeo con exito')
          this.consultaServ.consulta().then((resultC) => {
            console.log("resultC ", resultC)
            this.navCtl.navigateForward('consulta')
          })
        } else {
          this.showToast('error', 'Error', result['message'])
        }
      }).catch((err) => {
        this.showToast('error', 'Error', 'Hubo un problema al querer entrar')

        console.log('Error al auth ', err)
      });
    }
  }

  toRegistro() {
    this.navCtl.navigateForward('registro')
  }

}
