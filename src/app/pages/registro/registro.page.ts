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
    private registroServ: RegistroService
  ) { }

  ngOnInit() {
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

  getDate(e) {
    console.log('entro al date')
    this.date = new Date(e).toISOString().substring(0, 10);
  }

  submitRegistro() {
    if (!this.registro.valid) {
      this.showToast("error", "Error", "Verifique los campos del registro");
    } else if (this.password == this.password2) {
      console.log(this.registro.value)
      this.registro.value['date'] = this.date
      this.registroServ.registro(this.registro.value).then((result) => {
        console.log("result del registro ", result)
        if (result['response']) {
          this.showToast("success", "Exito", result['message']);
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
