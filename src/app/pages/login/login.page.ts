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
    private navCtl: NavController
  ) { }

  ngOnInit() {
  }

  showToast(severity, summary, detail) {
    //SUMMARY CABECERO DEL TOAST,DETAIL EL MSG, SEVERITY EL GRADO DEL TOAST
    this.msgService.add({ key: 'tst', severity: severity, summary: summary, detail: detail });
  }

  login() {
    if (this.email == '' || this.password == '') {
      this.showToast('error', 'Error', 'Favor de ingresar usuario y contraseña')
    } else {
      console.log('Entro al auth')
      this.authServ.auth(this.email, this.password).then((result) => {
        console.log('Result al auth ', result)
        if (result['response'] == false) {
          this.showToast('error', 'Error', result['message'])
        } else {
          this.showToast('success', 'Exito', 'Se logeo con exito')
          this.navCtl.navigateForward('consulta')
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
  toConsulta() {
    this.navCtl.navigateForward('consulta')
  }
}
