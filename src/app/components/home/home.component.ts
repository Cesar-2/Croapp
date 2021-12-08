import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  planes = [   
    {
      name:'ropa', expected_amount:1000, real_cost:1500
    }
  ];

  detalles = [
    {
      name:'ropa', costo:1000, fecha:'7/12/2021'
    }
  ]

  detalle_actual:any;
  show_detalle = false;
  option:any;


  constructor(protected loginService: LoginService, private router: Router) {  }

  ngOnInit(): void {

    if(localStorage.getItem('token') == undefined){
      this.router.navigate(['/Login'])
    }
  
    let token = localStorage.getItem('token');
    //const Authorization = `Authorization : Bearer ${token}`;
    if (!!token )
    {
      let headers =new HttpHeaders({ 'authorization': 'Basic ' + token })
      this.option = { headers: headers };
      this.loginService.getFinance(this.option).subscribe( value => {
        //planes.push(value);
        console.log(value);
        
      })

    }
  }

  planClick(plan){
    this.show_detalle = !this.show_detalle
    this.detalle_actual = plan
    
    if (!!this.option )
    {
      this.loginService.getDetalle(this.option, plan.id).subscribe( value => {
        //planes.push(value);
        console.log(value);
        
      })

    }
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/Login'])
  }

  createNewPlan(){
    Swal.fire({
      title: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })
  }
}
