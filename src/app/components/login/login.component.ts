import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../login/services/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(protected signUpService: SignupService, private router: Router) { }

  ngOnInit(): void {
    this.constructForm();
  }

  constructForm(){
    this.signUpForm = new FormGroup({
      citizen_code: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required,]),
      last_name: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required,]),
      phone_number: new FormControl('', [Validators.required,])
    })
  }

  runSignUp(){
    if (this.signUpForm.valid) {
      this.signUpService.register(this.signUpForm.value).subscribe(
        value => {
          this.alertErrorSesion('sisa');

          localStorage.setItem("token",value['access_token'])
          console.log(value);
          this.router.navigate(['/Home']);

        },
        error => {
          this.alertErrorSesion('Usuario o contraseña incorrectos');
        }
      )
    }
    else{
      this.alertErrorSesion('Formulario invalido');
    }
  }

  alertErrorSesion(message){
    Swal.fire(message)
  }
}
