import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../home/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  loginForm: FormGroup;

  constructor(protected loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != undefined) {
      this.router.navigate(['/Home'])
    }
    this.constructForm();
  }
  constructForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      keep_logged_in: new FormControl(true, [Validators.required])
    })
  }

  runAuth() {
    if (this.loginForm.valid) {
      this.loginService.auth(this.loginForm.value).subscribe(
        value => {
          this.alertErrorSesion('Bienvenido');
          localStorage.setItem("token", value['token'])
          this.router.navigate(['/Home']);
        },
        error => {
          this.alertErrorSesion("contraseña incorrecta");
        }
      )
    }
    else {
      this.alertErrorSesion("Formulario invalido");
    }
  }

  alertErrorSesion(message) {
    Swal.fire(message)
  }
}
