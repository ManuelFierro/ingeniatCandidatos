import { NavController } from '@ionic/angular';
import { RegistroService } from './../../services/registro.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  date: any;
  registro: any;
  apellido: any;
  nombre: any;
  fecha: any;
  email: any;
  password: any;
  password2: any;

  constructor(
    private msgService: MessageService,
    private registroServ: RegistroService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    //Se crea el formGroup para tener todos los campos del formulario, use dos passwords que deben ser iguales.
    this.registro = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  //Transforma el objeto date que se obtiene del componente de calendario y formatea
  getDate(e) {
    console.log('entro al date')
    this.date = new Date(e).toISOString().substring(0, 10);
  }

  submitRegistro() {
    //Se verifica si el formulario "registro" es valido/tiene respuestas, si no es valido mandara un toast
    //Si es valido se setea la fecha y se mandan los datos al service de registro donde se usa la api para registros
    //Si todo va bien mandara un toast y redireccionara al login
    if (!this.registro.valid) {
      this.showToast("error", "Error", "Verifique los campos del registro");
    } else if (this.password == this.password2) {
      console.log(this.registro.value)
      this.registro.value['date'] = this.date
      this.registroServ.registro(this.registro.value).then((result) => {
        console.log("result del registro ", result)
        if (result['response']) {
          this.showToast("success", "Exito", result['message']);
          setTimeout(() => {
            this.navCtrl.navigateForward('login')
          }, 500);
        } else {
          this.showToast("error", "Error", result['message']);
        }
      }).catch((err) => {
        console.log("Error en el registro ", err)
        this.showToast("error", "Campos incorrectos", "Hubo un error en el registro, favor de comunicarse con soporte técnico");
      });
    } else {
      this.showToast("error", "Campos incorrectos", "Las contraseñas no coinciden");
    }
  }

  showToast(sev, summary, detail) {
    this.msgService.add({
      key: 'tst',
      severity: sev,
      summary: summary,
      detail: detail
    });
  }
}
