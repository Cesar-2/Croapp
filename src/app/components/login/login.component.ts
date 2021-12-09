import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../login/services/signup.service';
import Swal from 'sweetalert2';
import { CommentService } from './services/comment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signUpForm: FormGroup;
  commentsForm: FormGroup;

  constructor(
    protected signUpService: SignupService,
    private router: Router,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.constructForm();
  }

  constructForm() {
    this.signUpForm = new FormGroup({
      citizen_code: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required,]),
      last_name: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required,]),
      phone_number: new FormControl('', [Validators.required,])
    })
    this.commentsForm = new FormGroup({
      name: new FormControl('', [Validators.required,]),
      last_name: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      content: new FormControl('', [Validators.required,]),
    })
  }

  runSignUp() {
    if (this.signUpForm.valid) {
      this.signUpService.register(this.signUpForm.value).subscribe(
        value => {
          this.alertErrorSesion('Bienvenido');
          localStorage.setItem("token", value['token'])
          this.router.navigate(['/Home']);

        },
        error => {
          this.alertErrorSesion('Usuario o contraseña incorrectos');
        }
      )
    }
    else {
      this.alertErrorSesion('Ingresa los datos correctamente para poder iniciar tu sesión');
    }
  }

  enviarComentario() {
    if (this.commentsForm.valid) {
      this.commentService.postComment(this.commentsForm.value).subscribe(
        value => {
          this.alertErrorSesion('Gracias por tus comentarios, ¡trabajamos cada dia para mejorar tu experiencia!');
        },
        error => {
          this.alertErrorSesion('Oops, se presentó un problema mientras se enviaba tu comentario, intentalo de nuevo mas tarde');
        }
      )
    } else {
      this.alertErrorSesion('Ingresa los datos correctamente para que podamos enviar tu comentario');
    }
  }

  alertErrorSesion(message) {
    Swal.fire(message)
  }
}
